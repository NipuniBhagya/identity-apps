/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

/**
 * Profile Model
 */
export interface BasicProfileInterface {
    displayName: string;
    emails: string[];
    email?: string;
    lastName: string;
    phoneNumbers: number[];
    organisation: string;
    responseStatus: number;
    roles?: string[];
    proUrl: string;
    isSecurity?: boolean;
    mobile?: string;
    userimage?: string;
    username?: string;
    // TODO: Create an interface for associations
    associations?: any;
}

/**
 * Linked account interface.
 */
export interface LinkedAccountInterface {
    /**
     * Tenant domain.
     */
    tenantDomain: string;
    /**
     * ID of the associated user.
     */
    userId: string;
    /**
     * User store domain.
     */
    userStoreDomain: string;
    /**
     * Username of the associated user.
     */
    username: string;
}

export const createEmptyProfile = (): BasicProfileInterface => ({
    associations: {},
    displayName: "",
    email: "",
    emails: [],
    isSecurity: false,
    lastName: "",
    mobile: "",
    organisation: "",
    phoneNumbers: [],
    proUrl: "",
    responseStatus: null,
    roles: [],
    userimage: "",
    username: ""
});

export const createProfile = (): UserMeta => ({
    caseExact: false,
    claimValue: "",
    description: "",
    displayName: "",
    displayOrder: "",
    multiValued: false,
    mutability: "",
    name: "",
    required: false,
    returned: "",
    subAttributes: [{}],
    type: "",
    uniqueness: "",

});

export interface UserMeta {
    claimValue: string;
    uniqueness: string;
    displayName: string;
    name: string;
    displayOrder: string;
    description: string;
    mutability: string;
    type: string;
    multiValued: boolean;
    caseExact: boolean;
    returned: string;
    required: boolean;
    subAttributes?: any;
}
