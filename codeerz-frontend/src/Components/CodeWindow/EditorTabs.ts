import { languageConfig } from "./CodeWindowConfig";
interface TabHandler {
  key: string | number;
  tabName: string;
  details: languageConfig;

}

/**
 * 
 * @param data 
 * @param {String} data.key
 * @returns 
 */
function generateTabConfig(data: any) {
  return {
    key: data.key,
    tabName: data.tabName,
    details: data.details,
  };
}
export { type TabHandler, generateTabConfig };
