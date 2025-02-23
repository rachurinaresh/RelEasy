export class Utility {
  /**
   * Convert any date time to Date/Month/Year.
   * @returns Converted any date time to Date/Month/Year.
   */
  static getDateInParticularFormat(dateValue: string) {
    const dateObj = new Date(dateValue);
    // Extract the date, time, and month using various Date methods
    const date = dateObj.getDate().toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
    const month = (dateObj.getMonth() + 1).toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
    const year = dateObj.getFullYear();
    // Construct the final date, time, and month strings in the desired format
    let formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  }

  static getTime(dateValue: string, getIn24HoursFormat: boolean = false) {
    const dateObj = new Date(dateValue);
    const hoursIn24Format = dateObj.getHours().toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
    const hoursIn12Format = (Number(hoursIn24Format) % 12 || 12).toLocaleString(
      "en-us",
      {
        minimumIntegerDigits: 2,
      }
    );
    const minutes = dateObj.getMinutes().toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
    const seconds = dateObj.getSeconds().toLocaleString("en-us", {
      minimumIntegerDigits: 2,
    });
    const timeIn12HoursFormat = `${hoursIn12Format}:${minutes}:${seconds} ${
      Number(hoursIn24Format) >= 12 ? "PM" : "AM"
    }`;
    return getIn24HoursFormat
      ? `${hoursIn24Format}:${minutes}`
      : timeIn12HoursFormat;
  }

  /**
   * Convert seconds.
   * @returns Converted seconds to minutes.
   */
  static getMinutesFromSeconds(secs: number): number {
    return Math.ceil(((secs % 86400) % 3600) / 60);
  }

  /**
   * Convert seconds.
   * @returns Converted seconds to hours,minutes,seconds.
   */
  static getTimeRemaining(totalSecs: number) {
    var hours = Math.floor(totalSecs / (60 * 60));

    var divisor_for_minutes = totalSecs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      totalSecs,
      hours,
      minutes,
      seconds,
    };
  }
  /**
   * Converts given Bytes to MB.
   * @returns Converted given Bytes to MB.
   */
  static getKbFromBytes(totalBytes: number) {
    // Convert the bytes to Kilobytes (1 KB = 1024 Bytes)
    const fileSizeInKB = totalBytes / 1024;
    // Convert the KB to MegaBytes (1 MB = 1024 KBytes)
    // const fileSizeInMB = fileSizeInKB / 1024; // MB
    return fileSizeInKB;
  }
  static getDecodedValueFromBase64String(base64String: string) {
    return Buffer.from(base64String, "base64")?.toString("utf-8");
  }
  static getEncodedValue(decodedString: string) {
    return Buffer.from(decodedString, "utf8").toString("base64");
  }
}
