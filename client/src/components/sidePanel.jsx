import React from "react";
import {
  EuiFieldText,
  EuiFormRow,
  EuiDualRange,
  EuiSwitch,
  EuiForm,
  EuiSpacer,
  EuiDatePickerRange,
  EuiDatePicker,
  EuiButton,
} from "@elastic/eui";
import moment from "moment";

import "@elastic/eui/dist/eui_theme_light.css";
import { htmlIdGenerator } from "@elastic/eui/lib/services";

const SidePanel = (props) => {
  const {
    discountRange,
    brandName,
    inStock,
    startDate,
    endDate,
  } = props.formData;

  return (
    <div className="sidenav">
      <EuiForm component="form">
        <EuiFormRow label="Discount Range">
          <EuiDualRange
            id={htmlIdGenerator()()}
            value={discountRange}
            onChange={props.onRangeChange}
            showInput
            showRange
            minInputProps={{ "aria-label": "Min value" }}
            maxInputProps={{ "aria-label": "Max value" }}
            aria-label="Discount-range"
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiFormRow label="Brand">
          <EuiFieldText
            name="brand-name"
            value={brandName}
            onChange={(e) => props.onBrandChange(e)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiFormRow label="Availability" hasChildLabel={false}>
          <EuiSwitch
            id={htmlIdGenerator()()}
            label="In Stock"
            name="switch"
            checked={inStock}
            onChange={props.onSwitchChange}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiFormRow label="Creation Date">
          <EuiDatePickerRange
            startDateControl={
              <EuiDatePicker
                selected={startDate}
                onChange={props.onStartDateChange}
                startDate={startDate}
                endDate={endDate}
                maxDate={moment()}
                isInvalid={startDate > endDate}
                aria-label="Start date"
              />
            }
            endDateControl={
              <EuiDatePicker
                selected={endDate}
                onChange={props.onEndDateChange}
                startDate={startDate}
                endDate={endDate}
                maxDate={moment()}
                isInvalid={startDate > endDate}
                aria-label="End date"
              />
            }
          />
        </EuiFormRow>
        <EuiButton onClick={props.onClick} fill>
          Filter
        </EuiButton>
      </EuiForm>
    </div>
  );
};

export default SidePanel;
