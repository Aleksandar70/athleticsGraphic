export abstract class UIText {
  static readonly CLOSE: string = "Close";
  static readonly TABLE_SAVE: string = "Save";
  static readonly SOURCES_HEADER: string = "Select data source";
  static readonly SIGNATURE_HEADER: string = "Select signature";
  static readonly FOOTER_TEXT: string = "© Elegra 2021";
  static readonly NO_RESULTS: string = "No Results 😐";
  static readonly NO_RESULTS_INIT: string = "Please initialize the database.";
  static readonly TOGGLE_COLUMNS_HEADER: string = "Toggle columns";
  static readonly TOGGLE_ALL_COLUMNS: string = "Show all";
  static readonly TOGGLE_DEFAULT_COLUMNS: string = "Reset to defaults";
  static readonly UPDATE_SAVED: string = "✔️ Saved";
  static readonly UPDATE_NOT_SAVED: string = "❌ Data wasn't saved";
  static readonly TOGGLE_LOCK_COLUMNS: string = "Lock columns";
  static readonly TOGGLE_LOCK_INFO: string =
    "Setting fields to active will prevent them from being overwritten in the database when new data comes from the API";

  static readonly TV_GRAPHIC_CONTROL: string = "Controls";
  static readonly START_LIST: string = "Start list";
  static readonly RESULT_LIST: string = "Result list";
  static readonly SHOW_PERSONAL_BEST: string = "Personal Best";
  static readonly EVENT_ANNOUNCEMENT: string = "Event Announcement";
  static readonly DISCIPLINE_ANNOUNCEMENT: string = "Discipline Announcement";
  static readonly SHOW_PERSONAL_SCORE: string = "Personal Score";
  static readonly SHOW_PERSONAL_DATA: string = "Personal Data";
  static readonly SIGNATURE: string = "Signature";
  static readonly PERSONAL_SCORE_ALERT_TEXT: string =
    "Please select one of the competitors in the table!";
  static readonly SIGNATURE_ALERT_TEXT: string =
    "Signature is successfully saved!";
  static readonly MEDALS: string = "Medals";
  static readonly TIME: string = "Time";
  static readonly CLEAR_ALL: string = "Clear all";
  static readonly CLEAR_SEQUENCE: string = "Clear";

  static readonly LABEL_EVENT: string = "Event";
  static readonly LABEL_PERSONAL: string = "Personal";
  static readonly BUTTON_SHOW: string = "Show";
  static readonly BUTTON_CANCEL: string = "Cancel";
  static readonly BUTTON_SAVE: string = "Save";
  static readonly TIME_MESSAGE: string = "You are about to show graphics for";

  static readonly INIT_WARNING: string = "⚠️ All existing data will be lost";
  static readonly INIT_BUTTON: string = "Initialize";
  static readonly INIT_BODY: string = `This will delete your currect data and create a new one from the API. If you wish to proceed, click ${UIText.INIT_BUTTON}.`;
  static readonly INIT_CANCEL: string = "Cancel";
  static readonly INIT_IN_PROGRESS: string = "Initializing...";

  static readonly LOCALE_DROPDOWN_HEADER: string = "Select language";
  static readonly ADD_LOCALE_MODAL_HEADER: string = "Enter locale name";
  static readonly LOCALE_MODAL_SAVE: string = "Save";
  static readonly LOCALE_MODAL_CANCEL: string = "Cancel";
  static readonly EDIT_LOCALE_MODAL_HEADER: string = "Enter translations";
}
