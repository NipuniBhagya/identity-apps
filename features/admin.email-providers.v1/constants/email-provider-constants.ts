/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import { IdentityAppsError } from "@wso2is/core/errors";

/**
 * Interface for the authentication type dropdown options.
 */
export interface DropdownChild {
    key: AuthenticationType;
    text: string;
    value: AuthenticationType;
}

/**
 * Enum for the authentication types.
 */
export enum AuthenticationType {
    BASIC = "BASIC",
    CLIENT_CREDENTIAL = "CLIENT_CREDENTIAL"
}

export class EmailProviderConstants {

    private constructor() { }

    public static readonly EMAIL_PROVIDER_CONFIG_NAME: string = "EmailPublisher";
    public static readonly REPLY_TO_ADDRESS_KEY: string = "mail.smtp.replyTo";
    public static readonly SIGNATURE_KEY: string = "mail.smtp.signature";
    public static readonly USERNAME: string = "userName";
    public static readonly PASSWORD: string = "password";
    public static readonly CLIENT_ID: string = "clientId";
    public static readonly CLIENT_SECRET: string = "clientSecret";
    public static readonly TOKEN_ENDPOINT: string = "tokenEndpoint";
    public static readonly SCOPES: string = "scopes";
    public static readonly AUTHENTICATION_TYPE: string = "authenticationType";

    public static readonly AUTHENTICATION_TYPE_BASIC: string = "BASIC";
    public static readonly AUTHENTICATION_TYPE_CLIENT_CREDENTIAL: string = "CLIENT_CREDENTIAL";

    public static readonly EMAIL_PROVIDER_CONFIG_FETCH_ERROR_CODE: string = "ASG-EPC-00001";
    public static readonly EMAIL_PROVIDER_CONFIG_FETCH_INVALID_STATUS_CODE_ERROR_CODE: string = "ASG-EPC-00002";
    public static readonly EMAIL_PROVIDER_CONFIG_UPDATE_ERROR_CODE: string = "ASG-EP-00003";
    public static readonly EMAIL_PROVIDER_CONFIG_DELETE_ERROR_CODE: string = "ASG-EP-60004";
    public static readonly EMAIL_PROVIDER_CONFIG_NOT_FOUND_ERROR_CODE: string = "NSM-60006";

    public static readonly EMAIL_PROVIDER_CONFIG_FIELD_MIN_LENGTH: number = 0;
    public static readonly EMAIL_PROVIDER_CONFIG_FIELD_MAX_LENGTH: number = 255;
    public static readonly EMAIL_PROVIDER_SERVER_PORT_MAX_LENGTH: number = 6;
    public static readonly EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static ErrorMessages: {
        EMAIL_PROVIDER_CONFIG_FETCH_ERROR_CODE: IdentityAppsError;
        EMAIL_PROVIDER_CONFIG_FETCH_INVALID_STATUS_CODE_ERROR_CODE: IdentityAppsError;
        EMAIL_PROVIDER_CONFIG_UPDATE_ERROR_CODE: IdentityAppsError;
        EMAIL_PROVIDER_CONFIG_DELETE_ERROR_CODE: IdentityAppsError;
    } = {
            EMAIL_PROVIDER_CONFIG_DELETE_ERROR_CODE: new IdentityAppsError(
                EmailProviderConstants.EMAIL_PROVIDER_CONFIG_DELETE_ERROR_CODE,
                "An error occurred while deleting the email provider configurations.",
                "Error while deleting email provider configurations",
                null
            ),
            EMAIL_PROVIDER_CONFIG_FETCH_ERROR_CODE: new IdentityAppsError(
                EmailProviderConstants.EMAIL_PROVIDER_CONFIG_FETCH_ERROR_CODE,
                "An error occurred while fetching the email provider configurations.",
                "Error while fetching the email provider configurations",
                null
            ),
            EMAIL_PROVIDER_CONFIG_FETCH_INVALID_STATUS_CODE_ERROR_CODE: new IdentityAppsError(
                EmailProviderConstants.EMAIL_PROVIDER_CONFIG_FETCH_INVALID_STATUS_CODE_ERROR_CODE,
                "Received an invalid status code while fetching the email provider configurations.",
                "Invalid Status Code while fetching the email provider configurations",
                null
            ),
            EMAIL_PROVIDER_CONFIG_UPDATE_ERROR_CODE: new IdentityAppsError(
                EmailProviderConstants.EMAIL_PROVIDER_CONFIG_UPDATE_ERROR_CODE,
                "An error occurred while updating the email provider configurations.",
                "Error while updating the email provider configurations",
                null
            )
        };

    public static readonly AUTH_TYPES: DropdownChild[] = [
        {
            key: AuthenticationType.BASIC,
            text: "emailProviders:fields.authentication.types.basic.name",
            value: AuthenticationType.BASIC
        },
        {
            key: AuthenticationType.CLIENT_CREDENTIAL,
            text: "emailProviders:fields.authentication.types.clientCredential.name",
            value: AuthenticationType.CLIENT_CREDENTIAL
        }
    ];
}
