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

import { useCallback, useEffect, useState } from "react";

const useDynamicForm = (fields) => {

    const [ formState, setFormState ] = useState({
        dirtyFields: {},
        disabled: false,
        errors: [],
        isDirty: false,
        isLoading: false,
        isValidating: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        touchedFields: {},
        values: {}
    });
    const [ formErrors, setFormErrors ] = useState({});

    useEffect(() => {
        if (!formErrors) {
            return;
        }

        setFormState((prev) => ({
            ...prev,
            errors: formErrors,
            isValid: !formErrors || Object.keys(formErrors).length === 0
        }));
    }, [ formErrors ]);

    const handleFieldError = useCallback((name, error) => {
        setFormState((prev) => {
            const updatedErrors = { ...prev.errors };

            if (error) {
                updatedErrors[name] = error[0]?.error || "Unknown error.";
            } else {
                delete updatedErrors[name];
            }

            return {
                ...prev,
                errors: updatedErrors,
                isValid: Object.keys(updatedErrors).length === 0
            };
        });
    }, []);

    const handleChange = useCallback((name, value) => {
        setFormState((prev) => {
            const updatedValues = {
                ...prev.values,
                [name]: value
            };

            return {
                ...prev,
                values: updatedValues,
                touched: {
                    ...prev.touched,
                    [name]: true
                },
                isDirty: value !== ""
            };
        });
    }, [ fields ]);

    const handleSubmit = (onSubmit) => (event) => {
        event.preventDefault();

        let errors = [];

        fields.forEach(field => {
            const fieldValue = formState.values[field.properties.name];

            if (field.properties.required && !fieldValue) {
                errors.push({
                    label: field.properties.name,
                    error: "This field is required."
                });
            }

            if (field.properties.validation) {
                field.properties.validation.forEach(rule => {
                    if (rule.type === "MIN_LENGTH" && fieldValue.length < rule.value) {
                        errors.push({
                            label: field.properties.name,
                            error: `Must be at least ${rule.value} characters.`
                        });
                    }
                });
            }
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setFormState((prev) => ({
                ...prev,
                errors,
                isValid: false
            }));

            return;
        }

        setFormState((prev) => ({
            ...prev,
            isValid: true
        }));

        onSubmit(event.nativeEvent.submitter.name, formState.values);
    };

    return {
        formState,
        handleChange,
        handleFieldError,
        handleFormErrors: setFormErrors,
        handleSubmit
    };
};

export default useDynamicForm;
