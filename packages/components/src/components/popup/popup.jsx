import React from 'react';
import PropTypes from 'prop-types';
import Body from './popup-body.jsx';
import Header from './popup-header.jsx';
import Modal from '../modal';

const Popup = ({
    active_tab_icon_color,
    balance,
    close_icon_color,
    header_backgound_color,
    header_banner_text,
    header_button_text,
    header_contents_color,
    header_icon,
    onHeaderButtonClick,
    should_show_popup,
    tab_icon_color,
    tabs_detail,
    title,
    togglePopupModal,
}) => {
    const header = () => {
        return (
            <Header
                button_text={header_button_text}
                title={title}
                balance={balance}
                text_color={header_contents_color}
                header_icon={header_icon}
                onButtonClick={onHeaderButtonClick}
                banner_text={header_banner_text}
            />
        );
    };

    return (
        <Modal
            className='popup'
            close_icon_color={close_icon_color}
            do_not_show_header_border
            header_backgound_color={header_backgound_color}
            height='636px'
            do_not_center_header_items
            is_open={should_show_popup}
            renderTitle={() => header()}
            toggleModal={togglePopupModal}
            width='776px'
        >
            <Modal.Body className='dc-popup__body'>
                <Body
                    active_tab_icon_color={active_tab_icon_color}
                    background_color={header_backgound_color}
                    tab_icon_color={tab_icon_color}
                    tabs_detail={tabs_detail}
                />
            </Modal.Body>
        </Modal>
    );
};

Popup.propTypes = {
    active_tab_icon_color: PropTypes.string,
    balance: PropTypes.string,
    close_icon_color: PropTypes.string,
    header_backgound_color: PropTypes.string,
    header_banner_text: PropTypes.string,
    header_button_text: PropTypes.string,
    header_contents_color: PropTypes.string,
    header_icon: PropTypes.string,
    onHeaderButtonClick: PropTypes.func,
    should_show_popup: PropTypes.bool,
    tab_icon_color: PropTypes.string,
    tabs_detail: PropTypes.arrayOf(
        PropTypes.shape({
            has_footer_separator: PropTypes.bool,
            renderBody: PropTypes.func,
            renderFooter: PropTypes.func,
            icon: PropTypes.string,
            id: PropTypes.number,
            title: PropTypes.string,
        })
    ).isRequired,
    title: PropTypes.string,
    togglePopupModal: PropTypes.func,
};

export default Popup;
