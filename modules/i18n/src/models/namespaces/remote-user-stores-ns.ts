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

import { NotificationItem } from "../common";

/**
 * Namespace for remote user stores feature.
 */
export interface RemoteUserStoresNS {
    pages: {
        create: {
            backButton: string;
            description: string;
            message: {
                optimized: string;
                classic: string;
            };
            notifications: {
                createUserStore: {
                    genericError: NotificationItem;
                    success: NotificationItem;
                };
            };
            title: string;
            stepper: {
                step1: {
                    description: string;
                    title: string;
                };
                step2: {
                    description: string;
                    title: string;
                };
            };
        };
        edit: {
            tabs: {
                guide: string;
                general: string;
                configurations: string;
            };
            guide: {
                heading: string;
                subHeading: string;
                steps: {
                    download: {
                        heading: string;
                        onPrem: {
                            description: string;
                            action: string;
                        };
                        remote: {
                            description: string;
                        };
                    };
                    configure: {
                        heading: string;
                        description: string;
                        docsDescription: string;
                    };
                    token: {
                        heading: string;
                        description: string;
                        action: string;
                        generatedToken: {
                            message: string;
                            label: string;
                        };
                    };
                    run: {
                        heading: string;
                        description: {
                            onPrem: string;
                            remote: string;
                        };
                        commands: {
                            unix: string;
                            windows: string;
                        };
                        successMessage: {
                            onPrem: string;
                            remote: string;
                        };
                        checkConnection: {
                            action: string;
                            successAction: string;
                            errorAction: string;
                            errorMessage: string;
                            errorHeading: string;
                        };
                    };
                    attributeMapping: {
                        heading: string;
                        description: string;
                    };
                };
            };
        };
    };
    form: {
        fields: {
            accessType: {
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            connectedUserStoreType: {
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            description: {
                label: string;
                placeholder: string;
            };
            groupIdMapping: {
                helperText: string;
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            groupnameMapping: {
                helperText: string;
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            name: {
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            readGroups: {
                helperText: string;
                label: string;
            };
            userIdMapping: {
                helperText: string;
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
            usernameMapping: {
                helperText: string;
                label: string;
                placeholder: string;
                validation: {
                    required: string;
                };
            };
        };
        sections: {
            groupAttributes: string;
            userAttributes: string;
        };
    };
    notifications: {
        typeFetchError: NotificationItem;
        tokenGenerateError: NotificationItem;
        connectionStatusCheckError: NotificationItem;
        disconnectError: NotificationItem;
    };
}
