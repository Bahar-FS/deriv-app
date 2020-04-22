import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Icon from 'Components/icon';
import Input from 'Components/input';

const DatePickerIcon = ({ icon, ...props }) => <Icon className='dc-datepicker__icon' icon={icon} {...props} />;

const DatePickerInput = ({
    className,
    disabled,
    error,
    id,
    is_placeholder_visible,
    name,
    label,
    show_leading_icon,
    placeholder,
    is_clearable,
    onChangeInput,
    onClickClear,
    onClick,
    onBlur,
    readOnly,
    value,
    required,
}) => {
    const [is_clear_btn_visible, setIsClearBtnVisible] = useState(false);

    const onMouseEnter = () => {
        if (is_clearable) {
            setIsClearBtnVisible(true);
        }
    };

    const onMouseLeave = () => {
        setIsClearBtnVisible(false);
    };

    const trailing_icon =
        is_clearable && is_clear_btn_visible ? (
            <DatePickerIcon icon='IcCloseCircle' onClick={onClickClear} color='secondary' />
        ) : (
            <DatePickerIcon icon='IcCalendar' />
        );

    return (
        <Input
            className={classNames('dc-datepicker__input', className, {
                'dc-datepicker__input--has-leading-icon': show_leading_icon,
            })}
            data-lpignore='true'
            disabled={disabled}
            error={error}
            id={id ? `${id}_input` : undefined}
            autocomplete='off'
            is_autocomplete_disabled='true'
            is_hj_whitelisted='true'
            label={label}
            name={name}
            onChange={onChangeInput}
            onClick={onClick}
            placeholder={placeholder}
            readOnly={readOnly}
            leading_icon={show_leading_icon ? <DatePickerIcon icon='IcCalendar' /> : undefined}
            trailing_icon={show_leading_icon ? undefined : trailing_icon}
            type={readOnly ? 'text' : 'number'}
            value={is_placeholder_visible || !value ? '' : value}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onBlur={onBlur}
            required={required}
        />
    );
};

DatePickerInput.propTypes = {
    className: PropTypes.string,
    error_messages: PropTypes.array,
    placeholder: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    is_clearable: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    show_leading_icon: PropTypes.bool,
    onClick: PropTypes.func,
    onClickClear: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default DatePickerInput;