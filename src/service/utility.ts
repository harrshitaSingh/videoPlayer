
class Utility {
  constructor() {}

  static formatTime(seconds: any) {
    console.log(seconds, " seconds ");
    const hour = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const sec = Math.floor(seconds % 60);

    var formattedMinutes = minutes < 10 ? "0" + minutes : "" + minutes;
    var formattedSeconds = sec < 10 ? "0" + sec : "" + sec;

    if (hour) {
      return `${hour}:${formattedMinutes}:${formattedSeconds}`;
    }
    return `${minutes}:${formattedSeconds}`;
  }
}

export default Utility;
