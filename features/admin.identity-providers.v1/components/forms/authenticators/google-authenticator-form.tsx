/**
 * Copyright (c) 2021-2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ConnectionUIConstants } from "@wso2is/admin.connections.v1/constants/connection-ui-constants";
import {
    FederatedAuthenticatorConstants
} from "@wso2is/admin.connections.v1/constants/federated-authenticator-constants";
import {
    CommonPluggableComponentMetaPropertyInterface,
    CommonPluggableComponentPropertyInterface
} from "@wso2is/admin.connections.v1/models/connection";
import { AppConstants } from "@wso2is/admin.core.v1/constants/app-constants";
import { AppState } from "@wso2is/admin.core.v1/store";
import { TestableComponentInterface } from "@wso2is/core/models";
import { Field, Form } from "@wso2is/form";
import { Code, FormSection, GenericIcon, Hint } from "@wso2is/react-components";
import isEmpty from "lodash-es/isEmpty";
import React, { FunctionComponent, ReactElement, ReactNode, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Icon, SemanticICONS } from "semantic-ui-react";
import {
    AuthenticatorSettingsFormModes,
    CommonAuthenticatorFormFieldInterface,
    CommonAuthenticatorFormFieldMetaInterface,
    CommonAuthenticatorFormInitialValuesInterface,
    CommonAuthenticatorFormMetaInterface,
    CommonAuthenticatorFormPropertyInterface
} from "../../../models";

/**
 * Interface for Google Authenticator Form props.
 */
interface GoogleAuthenticatorFormPropsInterface extends TestableComponentInterface {
    /**
     * The intended mode of the authenticator form.
     * If the mode is "EDIT", the form will be used in the edit view and will rely on metadata for readonly states, etc.
     * If the mode is "CREATE", the form will be used in the add wizards and will all the fields will be editable.
     */
    mode: AuthenticatorSettingsFormModes;
    /**
     * Google Authenticator metadata.
     */
    metadata: CommonAuthenticatorFormMetaInterface;
    /**
     * Google Authenticator configured initial values.
     */
    initialValues: CommonAuthenticatorFormInitialValuesInterface;
    /**
     * Callback for form submit.
     * @param values - Resolved Form Values.
     */
    onSubmit: (values: CommonAuthenticatorFormInitialValuesInterface) => void;
    /**
     * Is readonly.
     */
    readOnly?: boolean;
    /**
     * Flag to trigger form submit externally.
     */
    triggerSubmit: boolean;
    /**
     * Flag to enable/disable form submit button.
     */
    enableSubmitButton: boolean;
    /**
     * Flag to show/hide custom properties.
     * @remarks Not implemented ATM. Do this when needed.
     */
    showCustomProperties: boolean;
    /**
     * Specifies if the form is submitting.
     */
    isSubmitting?: boolean;
}

/**
 * Form initial values interface.
 */
interface GoogleAuthenticatorFormInitialValuesInterface {
    /**
     * Google Authenticator query parameters field value.
     */
    AdditionalQueryParameters: string;
    /**
     * Google Authenticator client secret field value.
     */
    ClientSecret: string;
    /**
     * Google Authenticator callback URL field value.
     */
    callbackUrl: string;
    /**
     * Google Authenticator client id field value.
     */
    ClientId: string;
    /**
    * Google Authenticator Google One Tap field value.
    */
    IsGoogleOneTapEnabled: boolean;
}

/**
 * Form fields interface.
 */
interface GoogleAuthenticatorFormFieldsInterface {
    /**
     * Google Authenticator query parameters field value.
     */
    AdditionalQueryParameters: CommonAuthenticatorFormFieldInterface;
    /**
     * Google Authenticator client secret field.
     */
    ClientSecret: CommonAuthenticatorFormFieldInterface;
    /**
     * Google Authenticator callback URL field.
     */
    callbackUrl: CommonAuthenticatorFormFieldInterface;
    /**
     * Google Authenticator client id field value.
     */
    ClientId: CommonAuthenticatorFormFieldInterface;
    /**
     * Google Authenticator Google One Tap field value.
     */
     IsGoogleOneTapEnabled: CommonAuthenticatorFormFieldInterface;
}

/**
 * Scopes UI displaying interface.
 */
interface ScopeMetaInterface {
    /**
     * Scope description.
     */
    description: string;
    /**
     * Scope display name.
     */
    displayName: ReactNode;
    /**
     * Scope icon.
     */
    icon: SemanticICONS
}

const FORM_ID: string = "google-authenticator-form";

/**
 * Google Authenticator Form.
 *
 * @param props - Props injected to the component.
 * @returns Functional component.
 */
export const GoogleAuthenticatorForm: FunctionComponent<GoogleAuthenticatorFormPropsInterface> = (
    props: GoogleAuthenticatorFormPropsInterface
): ReactElement => {

    const {
        metadata,
        mode,
        initialValues: originalInitialValues,
        onSubmit,
        readOnly,
        isSubmitting,
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const [ formFields, setFormFields ] = useState<GoogleAuthenticatorFormFieldsInterface>(undefined);
    const [ initialValues, setInitialValues ] = useState<GoogleAuthenticatorFormInitialValuesInterface>(undefined);
    /**
    * Importing all UI configurations.
    */
    const googleOneTapEnabledTenants: string[] = useSelector((state: AppState) =>
        state?.config?.ui?.googleOneTapEnabledTenants);

    /**
     * Flattens and resolved form initial values and field metadata.
     */
    useEffect(() => {

        if (isEmpty(originalInitialValues?.properties)) {
            return;
        }

        let resolvedFormFields: GoogleAuthenticatorFormFieldsInterface = null;
        let resolvedInitialValues: GoogleAuthenticatorFormInitialValuesInterface = null;

        originalInitialValues.properties.map((value: CommonAuthenticatorFormPropertyInterface) => {
            const meta: CommonAuthenticatorFormFieldMetaInterface = metadata?.properties
                .find((meta: CommonPluggableComponentMetaPropertyInterface) => meta.key === value.key);

            /**
            * Parsing string  to boolean only for Google One Tap value
            */
            let localValue : any;

            if (value.key === FederatedAuthenticatorConstants.GOOGLE_ONE_TAP_ENABLED_PARAM) {
                if (value.value === "true") {
                    localValue = true;
                } else {
                    localValue = false;
                }
            } else {
                localValue = value.value;
            }

            resolvedFormFields = {
                ...resolvedFormFields,
                [ value.key ]: {
                    meta,
                    value: localValue
                }
            };

            resolvedInitialValues = {
                ...resolvedInitialValues,
                [ value.key ]: localValue
            };
        });

        setFormFields(resolvedFormFields);
        setInitialValues(resolvedInitialValues);
    }, [ originalInitialValues ]);

    /**
     * Checking ability to enable Google One Tap.
     *
     * @returns Whether enable Google One Tap or not.
     */
    const isEnableGoogleOneTap = (): boolean => {
        if (googleOneTapEnabledTenants?.length > 0) {
            return googleOneTapEnabledTenants.includes(AppConstants.getTenant());
        }

        /**
         * To enable Google One Tap for all tenants
         * if this configuration is not defined or empty.
         */
        return true;
    };

    /**
     * Prepare form values for submitting.
     *
     * @param values - Form values.
     *
     * @returns Sanitized form values.
     */
    const getUpdatedConfigurations = (values: GoogleAuthenticatorFormInitialValuesInterface)
        : CommonAuthenticatorFormInitialValuesInterface => {

        const properties: CommonPluggableComponentPropertyInterface[] = [];

        for (const [ key, value ] of Object.entries(values)) {
            if (key !== undefined) {
                properties.push({
                    key: key,
                    value: value
                });
            }
        }

        return {
            ...originalInitialValues,
            properties
        };
    };

    /**
     * Resolve metadata for UI rendering of scopes.
     *
     * @param scope - Input scope.
     *
     * @returns resolved Scope Metadata
     */
    const resolveScopeMetadata = (scope: string): ScopeMetaInterface => {

        if (scope === FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.EMAIL) {
            return {
                description: t("authenticationProvider:forms" +
                    ".authenticatorSettings.google.scopes.list.email.description"),
                displayName: (
                    <Code compact withBackground={ false } fontSize="inherit" fontColor="inherit">
                        { FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.EMAIL }
                    </Code>
                ),
                icon: "envelope outline"
            };
        }

        if (scope === FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.OPENID) {
            return {
                description: t("authenticationProvider:forms" +
                    ".authenticatorSettings.google.scopes.list.openid.description"),
                displayName: (
                    <Code compact withBackground={ false } fontSize="inherit" fontColor="inherit">
                        { FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.OPENID }
                    </Code>
                ),
                icon: "openid"
            };
        }

        if (scope === FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.PROFILE) {
            return {
                description: t("authenticationProvider:forms" +
                    ".authenticatorSettings.google.scopes.list.profile.description"),
                displayName: (
                    <Code compact withBackground={ false } fontSize="inherit" fontColor="inherit">
                        { FederatedAuthenticatorConstants.GOOGLE_SCOPE_DICTIONARY.PROFILE }
                    </Code>
                ),
                icon: "user outline"
            };
        }

        return {
            description: "",
            displayName: scope,
            icon: "key"
        };
    };

    /**
     * Extracts scopes as an array.
     *
     * Input - "scope=openid email profile"
     * Output - [ "openid", "email", "profile" ]
     *
     * @param rawScopes - Raw String.
     *
     * @returns list of scopes
     */
    const extractScopes = (rawScopes: string): string[] => {

        let scopes: string[] = [];

        try {
            scopes = new URLSearchParams(rawScopes).get("scope").split(" ");
        } catch(e) {
            // Silent any issues occurred when trying to scroll.
            // Add debug logs here one a logger is added.
            // Tracked here https://github.com/wso2/product-is/issues/11650.
        }

        return scopes;
    };

    return (
        <Form
            id={ FORM_ID }
            uncontrolledForm={ false }
            onSubmit={ (values: Record<string, unknown>) => onSubmit(getUpdatedConfigurations(values as any)) }
            initialValues={ initialValues }
        >
            <Field.Input
                ariaLabel="Google authenticator client ID"
                inputType="default"
                name="ClientId"
                label={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.clientId.label")
                }
                placeholder={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.clientId.placeholder")
                }
                hint={ (
                    <Trans
                        i18nKey={
                            "authenticationProvider:forms.authenticatorSettings" +
                            ".google.clientId.hint"
                        }
                    >
                        The <Code>Client ID</Code> you received from Google for your OAuth app.
                    </Trans>
                ) }
                required={ formFields?.ClientId?.meta?.isMandatory }
                readOnly={
                    readOnly || (
                        mode === AuthenticatorSettingsFormModes.CREATE
                            ? false
                            : formFields?.ClientId?.meta?.readOnly
                    )
                }
                value={ formFields?.ClientId?.value }
                maxLength={ ConnectionUIConstants
                    .AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS.CLIENT_ID_MAX_LENGTH as number }
                minLength={
                    ConnectionUIConstants
                        .AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS.CLIENT_ID_MIN_LENGTH as number
                }
                width={ 16 }
                data-testid={ `${ testId }-client-id` }
            />
            <Field.Input
                ariaLabel="Google authenticator client secret"
                className="addon-field-wrapper"
                inputType="password"
                type="password"
                name="ClientSecret"
                label={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.clientSecret.label")
                }
                placeholder={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.clientSecret.placeholder")
                }
                hint={ (
                    <Trans
                        i18nKey={
                            "authenticationProvider:forms.authenticatorSettings" +
                            ".google.clientSecret.hint"
                        }
                    >
                        The <Code>App secret</Code> value of the Google application.
                    </Trans>
                ) }
                required={ formFields?.ClientSecret?.meta?.isMandatory }
                readOnly={
                    readOnly || (
                        mode === AuthenticatorSettingsFormModes.CREATE
                            ? false
                            : formFields?.ClientSecret?.meta?.readOnly
                    )
                }
                value={ formFields?.ClientSecret?.value }
                maxLength={ formFields?.ClientSecret?.meta?.maxLength }
                minLength={
                    ConnectionUIConstants
                        .AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS.CLIENT_SECRET_MIN_LENGTH as number
                }
                width={ 16 }
                data-testid={ `${ testId }-client-secret` }
            />
            <Field.Input
                ariaLabel="Google authenticator authorized redirect URL"
                inputType="copy_input"
                name="callbackUrl"
                label={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.callbackUrl.label")
                }
                placeholder={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.callbackUrl.placeholder")
                }
                hint={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.callbackUrl.hint")
                }
                required={ formFields?.callbackUrl?.meta?.isMandatory }
                value={ formFields?.callbackUrl?.value }
                readOnly={
                    readOnly || (
                        mode === AuthenticatorSettingsFormModes.CREATE
                            ? false
                            : formFields?.callbackUrl?.meta?.readOnly
                    )
                }
                maxLength={ formFields?.callbackUrl?.meta?.maxLength }
                minLength={
                    ConnectionUIConstants
                        .AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS.CALLBACK_URL_MIN_LENGTH as number
                }
                width={ 16 }
                data-testid={ `${ testId }-authorized-redirect-url` }
            />
            <Field.Input
                ariaLabel={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.AdditionalQueryParameters.ariaLabel")
                }
                inputType="default"
                name="AdditionalQueryParameters"
                label={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.AdditionalQueryParameters.label")
                }
                placeholder={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.AdditionalQueryParameters.placeholder")
                }
                hint={
                    t("authenticationProvider:forms.authenticatorSettings" +
                        ".google.AdditionalQueryParameters.hint")
                }
                required={ formFields?.AdditionalQueryParameters?.meta?.isMandatory }
                value={ formFields?.AdditionalQueryParameters?.value }
                readOnly={
                    readOnly || (
                        mode === AuthenticatorSettingsFormModes.CREATE
                            ? false
                            : formFields?.AdditionalQueryParameters?.meta?.readOnly
                    )
                }
                maxLength={
                    ConnectionUIConstants.GOOGLE_AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS
                        .ADDITIONAL_QUERY_PARAMS_MAX_LENGTH as number
                }
                minLength={
                    ConnectionUIConstants.GOOGLE_AUTHENTICATOR_SETTINGS_FORM_FIELD_CONSTRAINTS
                        .ADDITIONAL_QUERY_PARAMS_MIN_LENGTH as number
                }
                width={ 16 }
                data-testid={ `${ testId }-additional-query-parameters` }
            />
            { isEnableGoogleOneTap()
                ? (
                    <Field.Checkbox
                        ariaLabel="Enable Google One Tap as a sign in option"
                        name={ FederatedAuthenticatorConstants.GOOGLE_ONE_TAP_ENABLED_PARAM }
                        required={ false }
                        toggle
                        label={
                            t("authenticationProvider:forms.authenticatorSettings" +
                               ".google.enableGoogleOneTap.label")
                        }
                        placeholder={
                            t("authenticationProvider:forms.authenticatorSettings" +
                               ".google.enableGoogleOneTap.placeholder")
                        }
                        hint={
                            t("authenticationProvider:forms.authenticatorSettings" +
                               ".google.enableGoogleOneTap.hint")
                        }
                        readOnly={ readOnly }
                        data-testid={ `${ testId }-google-one-tap` }
                    />
                ) : null
            }
            {
                (formFields?.AdditionalQueryParameters?.value
                    && !isEmpty(extractScopes(formFields.AdditionalQueryParameters.value))) && (
                    <FormSection
                        heading={
                            t("authenticationProvider:forms" +
                                ".authenticatorSettings.google.scopes.heading")
                        }
                    >
                        <div className="authenticator-dynamic-properties">
                            {
                                extractScopes(formFields.AdditionalQueryParameters.value)
                                    .map((scope: string, index: number) => {

                                        const scopeMeta: ScopeMetaInterface = resolveScopeMetadata(scope);

                                        return (
                                            <div
                                                key={ index }
                                                className="authenticator-dynamic-property"
                                                data-testid={ scope }
                                            >
                                                <div className="authenticator-dynamic-property-name-container">
                                                    <GenericIcon
                                                        square
                                                        inline
                                                        transparent
                                                        icon={ <Icon name={ scopeMeta.icon }/> }
                                                        size="micro"
                                                        className="scope-icon"
                                                        spaced="right"
                                                        verticalAlign="top"
                                                    />
                                                    <div data-testid={ `${ scope }-name` }>
                                                        { scopeMeta.displayName }
                                                    </div>
                                                </div>
                                                <div
                                                    className="authenticator-dynamic-property-description"
                                                    data-testid={ `${ scope }-description` }
                                                >
                                                    { scopeMeta.description }
                                                </div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                        <Hint compact>
                            <Trans
                                i18nKey={
                                    "authenticationProvider:forms" +
                                    ".authenticatorSettings.google.scopes.hint"
                                }
                            >
                                Scopes provide a way for connected apps to access data from Google.
                                Click <a
                                    href={
                                        "https://developers.google.com/identity/protocols/oauth2/" +
                                        "openid-connect#scope-param"
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >here</a> to learn more.
                            </Trans>
                        </Hint>
                    </FormSection>
                )
            }
            <Field.Button
                form={ FORM_ID }
                size="small"
                buttonType="primary_btn"
                ariaLabel="Google authenticator update button"
                name="update-button"
                data-testid={ `${ testId }-submit-button` }
                disabled={ isSubmitting }
                loading={ isSubmitting }
                label={ t("common:update") }
                hidden={ readOnly }
            />
        </Form>
    );
};

/**
 * Default props for the component.
 */
GoogleAuthenticatorForm.defaultProps = {
    "data-testid": "google-authenticator-form",
    enableSubmitButton: true
};

