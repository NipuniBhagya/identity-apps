/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useFieldValidation from "../../hooks/use-field-validations";
import { useTranslations } from "../../hooks/use-translations";
import { resolveElementText } from "../../utils/i18n-utils";
import { getInputIconClass } from "../../utils/ui-utils";
import ValidationCriteria from "../validation-criteria";
import ValidationError from "../validation-error";

const TextFieldAdapter = ({ component, formState, formStateHandler, fieldErrorHandler }) => {

    const { name, required, styles, label, placeholder, rest, validation } = component.properties;

    const { translations } = useTranslations();
    const { fieldErrors, validate } = useFieldValidation(validation);

    const [ value, setValue ] = useState("");

    const formError = formState?.errors?.length > 0 && formState?.errors?.filter(error => error.label === name);
    const fieldError = formError[0]?.error || (fieldErrors.length > 0 ? fieldErrors[0]?.error : null);

    useEffect(() => {
        formStateHandler(component.properties.name, value);
    }, [ value ]);

    const handleFieldChange = (value) => {
        const isValid = validate({ name, required }, value);
        fieldErrorHandler(name, isValid ? null : fieldErrors);
    };

    const inputIconClass = getInputIconClass(name);

    return (
        <div className={ classNames("field", required ? "required" : null) } style={ styles }>
            <label htmlFor={ name }>{ resolveElementText(translations, label) }</label>
            <div className={ classNames("ui fluid input", inputIconClass ? "left icon" : null) }>
                <input
                    placeholder={ resolveElementText(translations, placeholder) }
                    onChange={ (e) => setValue(e.target.value) }
                    onBlur={ (e) => handleFieldChange(e.target.value) }
                    required={ required }
                    { ...rest }
                />
                {
                    inputIconClass
                        ? <i aria-hidden="true" className={ `${ getInputIconClass(name) } icon` }></i>
                        : null
                }
            </div>
            {
                validation && validation.type === "CRITERIA" && validation.showValidationCriteria (
                    <ValidationCriteria validationConfig={ validation } errors={ fieldErrors } value={ value } />
                )
            }
            { fieldError && <ValidationError error={ fieldError } />}
        </div>
    );
};

TextFieldAdapter.propTypes = {
    component: PropTypes.object.isRequired,
    formStateHandler: PropTypes.func.isRequired
};

export default TextFieldAdapter;
