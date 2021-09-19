
chrome.storage.local.get(['water'], function(result) {
    console.log(result);
    if (result.water == "true") {
        document.getElementById("waterCheckbox").checked = true;
    } else {
        document.getElementById("waterCheckbox").checked = false;
    }
})

chrome.storage.local.get(['standing'], function(result) {
    console.log(result);
    if (result.standing == "true") {
        document.getElementById("standingCheckbox").checked = true;
    } else {
        document.getElementById("standingCheckbox").checked = false;
    }
})

document.getElementById("waterCheckbox").addEventListener("change", async e => {
    if (e.target.checked) {
        console.log("checked");
        chrome.storage.local.set({"water":"true"});
        let alarmCreateInfo = {
            "periodInMinutes": 2
        }
        await chrome.alarms.create("waterAlarm", alarmCreateInfo);
    } else {
        console.log("not checked");
        chrome.storage.local.set({"water":"false"});
        await chrome.alarms.clear("waterAlarm");
    }
})

document.getElementById("standingCheckbox").addEventListener("change", async e => {
    if (e.target.checked) {
        console.log("checked");
        chrome.storage.local.set({"standing":"true"});
        let alarmCreateInfo = {
            "periodInMinutes": 1
        }
        await chrome.alarms.create("standingAlarm", alarmCreateInfo);
    } else {
        console.log("not checked");
        chrome.storage.local.set({"standing":"false"});
        await chrome.alarms.clear("standingAlarm");
    }
})