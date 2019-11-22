/* eslint-disable */
import { str as crc32 }     from 'crc-32';
import i18n                 from 'i18next';
import { initReactI18next } from 'react-i18next';
// TODO: lazy load these: with i18n.addResourceBundle
import ach                  from '../translations/ach.json';
import en                   from '../translations/en.json';
import fr                   from '../translations/fr.json';
import id                   from '../translations/id.json';
import it                   from '../translations/it.json';
import pl                   from '../translations/pl.json';
import pt                   from '../translations/pt.json';
import ru                   from '../translations/ru.json';
import vi                   from '../translations/ru.json';
import zh_cn                from '../translations/zh_cn.json';
import zh_tw                from '../translations/zh_tw.json';

const LANGUAGE_KEY     = 'i18n_language';
const DEFAULT_LANGUAGE = 'EN';
const ALL_LANGUAGES    = Object.freeze({
    ACH  : 'Translations',
    EN   : 'English',
    ES   : 'Español',
    FR   : 'Français',
    ID   : 'Indonesia',
    IT   : 'Italiano',
    PL   : 'Polish',
    PT   : 'Português',
    RU   : 'Русский',
    TH   : 'Thai',
    VI   : 'Tiếng Việt',
    ZH_CN: '简体中文',
    ZH_TW: '繁體中文',
});

const hasLanguage = lang => {
    if (!lang) return false;
    return Object.keys(ALL_LANGUAGES).includes(lang.toUpperCase());
};

const getAllLanguages = () => ALL_LANGUAGES;

const getInitialLanguage = () => {
    const has_url_search_language = window.location.search && window.location.search.includes('lang=');
    const local_storage_language  = localStorage.getItem(LANGUAGE_KEY);

    if (has_url_search_language) {
        const query_lang = window.location.search
            .substr(1).split('&')
            .find(query => query.includes('lang='))
            .split('=')[1]
            .toUpperCase()
        if (hasLanguage(query_lang)) {
            localStorage.setItem(LANGUAGE_KEY, query_lang);
            return query_lang;
        }
    }

    if (local_storage_language) {
        if (hasLanguage(local_storage_language)) {
            return local_storage_language;
        }
    }

    return DEFAULT_LANGUAGE;
};

const initial_language = getInitialLanguage();
const i18n_config = {
    resources: {
        ACH  : { translation: {...ach } },
        EN   : { translation: { ...en } },
        FR   : { translation: { ...fr } },
        ID   : { translation: { ...id } },
        IT   : { translation: { ...it } },
        PL   : { translation: { ...pl } },
        PT   : { translation: { ...pt } },
        RU   : { translation: { ...ru } },
        VI   : { translation: { ...vi } },
        ZH_CN: { translation: { ...zh_cn } },
        ZH_TW: { translation: { ...zh_tw } },
    },
    react: {
        hashTransKey(defaultValue) {
            return crc32(defaultValue);
        },
    },
    lng: initial_language,
    fallbackLng: 'EN',
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(i18n_config);

const changeLanguage = (lang, cb) => {
    if (hasLanguage(lang)) {
        i18n.changeLanguage(lang, () => {
            localStorage.setItem(LANGUAGE_KEY, lang);
            cb();
        })
    }
}

const getLanguage = () => i18n.language;

const localize = (string, values) => {
    if (!string) return '';
    return i18n.t(crc32(string), { defaultValue: string, ...values })
};

const loadIncontextTranslation = () => {
    const is_ach = i18n.language === 'ACH';
    if (is_ach) {
        const jipt = document.createElement('script')
        jipt.type = 'text/javascript'
        jipt.text = `
            var _jipt = []; _jipt.push(['project', 'deriv-app']);
            var crowdin = document.createElement("script");
            crowdin.setAttribute('src', '//cdn.crowdin.com/jipt/jipt.js');
            document.head.appendChild(crowdin);
        `
        document.head.appendChild(jipt)
    }
}

export default { i18n, localize, changeLanguage, getLanguage, getAllLanguages, loadIncontextTranslation };
