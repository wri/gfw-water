import string from 'dojo/string';
import locale from 'dojo/date/locale';

export default {
  oneDayAgo: () => {
    // Variables to set definition query on fires layer to only show fires in 
    // the last 24 hours.
    // 
    // layer def needs to look like:
    // Date BETWEEN timestamp '2015-12-27 05:00:00' AND timestamp '2015-12-28 04:59:59'
    let def;
    
    let dateField = 'Date';
    // see http://dojotoolkit.org/reference-guide/1.10/dojo/date/locale/format.html
    let timestampFormat = { datePattern: 'y-M-d', timePattern: 'kk:mm:ss'};
    let defTemplate = dateField + ' BETWEEN timestamp \'${start}\' AND timestamp \'${end}\'';
    let oneDay = 1000 * 60 * 60 * 24;
    let now = new Date();
    let yesterday = new Date(now.getTime() - oneDay);
    let queryNow = locale.format(now, timestampFormat);
    let queryYesterday = locale.format(yesterday, timestampFormat);

    def = string.substitute(defTemplate, { 
      start: queryYesterday, 
      end: queryNow 
    });
    console.log('def', def);
    return def;
    return 'hi';
  }
}
