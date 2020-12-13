import { PropTypes as MobxPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Loadable from 'react-loadable';
import { UILoader } from '@deriv/components';
import { urlForLanguage } from '@deriv/shared';
import { getLanguage } from '@deriv/translations';
import BinaryRoutes from 'App/Components/Routes';
import { connect } from 'Stores/connect';

const Error = Loadable({
    loader: () => import(/* webpackChunkName: "error-component" */ 'App/Components/Elements/Errors'),
    loading: UILoader,
    render(loaded, props) {
        const Component = loaded.default;
        return <Component {...props} />;
    },
});

const Routes = ({ error, has_error, history, is_logged_in, location, passthrough, ...props }) => {
    let initial_route,
        unlisten_to_change = null;

    React.useEffect(() => {
        if (!unlisten_to_change && !initial_route) {
            initial_route = location.pathname;
        }

        props.setInitialRouteHistoryItem(history.location);

        unlisten_to_change = history.listen((route_to, action) => {
            if (['PUSH', 'POP'].includes(action)) props.addRouteHistoryItem({ ...route_to, action });
        });

        props.setAppRouterHistory(history);

        return () => {
            if (typeof unlisten_to_change === 'function') {
                unlisten_to_change();
                unlisten_to_change = null;
                initial_route = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const lang = getLanguage();
    const lang_regex = /[?&]lang=/;

    if (has_error) {
        return <Error {...error} />;
    }

    // we need to replace state of history object on every route
    // to prevent language query parameter from disappering for non-english languages
    if (!lang_regex.test(location.search) && lang !== 'EN') {
        window.history.replaceState({}, document.title, urlForLanguage(lang));
    }

    return <BinaryRoutes is_logged_in={is_logged_in} passthrough={passthrough} />;
};

Routes.propTypes = {
    error: MobxPropTypes.objectOrObservableObject,
    has_error: PropTypes.bool,
    history: PropTypes.object,
    is_logged_in: PropTypes.bool,
    setAppRouterHistory: PropTypes.func,
    addRouteHistoryItem: PropTypes.func,
    setInitialRouteHistoryItem: PropTypes.func,
};

// need to wrap withRouter around connect
// to prevent updates on <BinaryRoutes /> from being blocked
export default withRouter(
    connect(({ client, common }) => ({
        error: common.error,
        has_error: common.has_error,
        is_logged_in: client.is_logged_in,
        setAppRouterHistory: common.setAppRouterHistory,
        addRouteHistoryItem: common.addRouteHistoryItem,
        setInitialRouteHistoryItem: common.setInitialRouteHistoryItem,
    }))(Routes)
);
