import I18n from "i18n-js";
import translations from './locale';

I18n.locale = "ja";
I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || translations["en"]), {});
I18n.translations["ja"] = I18n.extend((I18n.translations["ja"] || translations["ja"]), {});

export default I18n;
