/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the 'License'); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as forge from "node-forge";
import { CERTIFICATE_BEGIN, CERTIFICATE_END, END_LINE } from "../constants";
import { Certificate, DisplayCertificate } from "../models";

/**
 * Utility class for certificate management operations.
 */
export class CertificateManagementUtils {
    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    /**
     * Converts a PEM encoded string to a Forge certificate object.
     *
     * @param {string} pem The PEM encoded certificate content.
     *
     * @returns {forge.pki.Certificate} The Forge Certificate object.
     */
    public static decodeCertificate(pem: string): forge.pki.Certificate {
        const pemValue = pem?.split("\n");

        // appends -----END CERTIFICATE-----.
        pemValue?.push(CERTIFICATE_END);

        // appends a new line.
        pemValue?.push(END_LINE);

        // pushes -----BEGIN CERTIFICATE----- to the top.
        pemValue?.unshift(CERTIFICATE_BEGIN);

        const pemCert = pemValue?.join("\n");

        return forge.pki.certificateFromPem(pemCert);
    }

    /**
     * This serializes the certificate content to a displayable format.
     *
     * @param {Certificate} certificate The Certificate object returned by teh API endpoints.
     * @param {string} pem The PEM encoded certificate content.
     */
    public static displayCertificate(certificate: Certificate, pem: string): DisplayCertificate {

        const certificateForge = CertificateManagementUtils.decodeCertificate(pem);

        const displayCertificate: DisplayCertificate = {
            alias: certificate? certificate.alias : null,
            issuerDN: certificateForge.issuer.attributes
                .map(attribute => {
                    return {
                        [ attribute.shortName ]: attribute.value
                    }
                }),
            serialNumber: certificateForge.serialNumber,
            subjectDN: certificateForge.subject.attributes
                .map(attribute => {
                    return {
                        [ attribute.shortName ]: attribute.value
                    }
                }),
            validFrom: certificateForge.validity.notBefore,
            validTill: certificateForge.validity.notAfter,
            version: certificateForge.version
        };

        return displayCertificate;
    }

    /**
     * This serializes the certificate object.
     *
     * @param {Certificate} data The data object containing the alias and the PEM string.
     * @param {forge.pki.Certificate} certificateForge The Forge Certificate object.
     */
    public  static decodeForgeCertificate(data: Certificate, certificateForge: forge.pki.Certificate):
        DisplayCertificate {
        const displayCertificate: DisplayCertificate = {
            alias: data.alias,
            issuerDN: certificateForge.issuer.attributes
                .map(attribute => {
                    return {
                        [ attribute.shortName ]: attribute.value
                    }
                }),
            serialNumber: certificateForge.serialNumber,
            subjectDN: certificateForge.subject.attributes
                .map(attribute => {
                    return {
                        [ attribute.shortName ]: attribute.value
                    }
                }),
            validFrom: certificateForge.validity.notBefore,
            validTill: certificateForge.validity.notAfter,
            version: certificateForge.version
        };

       return displayCertificate;
    }
}
