chrome.alarms.onAlarm.addListener(alarm);
setAlarm();

function alarm(alarm) {
    let date = Date.now().toString();
    console.log("Alarm Triggered");
    if (alarm.name == "waterAlarm") {
        let notificationOptions = {
            "type": "basic",
            "title": "Drink Water",
            "message": "It is time to drink water",
            "iconUrl":"heart.png"
        }
        chrome.notifications.create(`water${date}`,notificationOptions);
    }
    if (alarm.name == "standingAlarm") {
        /*
        chrome.tabs.create({
            url: 'src/Background/standing_timer.html'
          });
          */
        let notificationOptions = {
            "type": "basic",
            "title": "Time to Stand!",
            "message": "Stand for at least one minute",
            "iconUrl":"heart.png"
        }
        chrome.notifications.create(`stand${date}`,notificationOptions);
    }

}

function setAlarm() {
    chrome.storage.local.get(['water'], async function(result) {
        console.log(result);
        if (result.water == "true") {
            let alarmCreateInfo = {
                "periodInMinutes": 2
            }
            await chrome.alarms.create("waterAlarm", alarmCreateInfo);
        } else {
            await chrome.alarms.clear("waterAlarm");
        }
    })
    
    chrome.storage.local.get(['standing'], async function(result) {
        console.log(result);
        if (result.standing == "true") {
            let alarmCreateInfo = {
                "periodInMinutes": 1
            }
            await chrome.alarms.create("standingAlarm", alarmCreateInfo);
        } else {
            await chrome.alarms.clear("standingAlarm");
        }
    })
}