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
import { DateInput } from "semantic-ui-calendar-react";

const DateFieldAdapter = ({ component, formState, formStateHandler, fieldErrorHandler }) => {

    const { name, required, label, placeholder, validation } = component.properties;

    const { translations } = useTranslations();
    const { fieldErrors, validate } = useFieldValidation(validation);

    const formError = formState?.errors?.length > 0 && formState?.errors?.filter(error => error.label === name);
    const fieldError = formError[0]?.error || (fieldErrors.length > 0 ? fieldErrors[0]?.error : null);

    const [ value, setValue ] = useState("");

    useEffect(() => {
        formStateHandler(component.properties.name, value);
    }, [ value ]);

    const inputIconClass = getInputIconClass(name);

    return (
        <div className={ classNames("field", required ? "required" : null) } style={ { width: "100%" } }>
            <label htmlFor={ name }>{ resolveElementText(translations, label) }</label>
            <div className={ classNames("ui fluid input", inputIconClass ? "left icon" : null) }>
                <DateInput
                    name={ name }
                    placeholder={ placeholder }
                    iconPosition="left"
                    onChange={ (event, { value }) => setValue(value) }
                    required={ required }
                    clearable
                    closeOnMouseLeave
                    closable
                />
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

DateFieldAdapter.propTypes = {
    component: PropTypes.object.isRequired,
    formStateHandler: PropTypes.func.isRequired
};

export default DateFieldAdapter;
