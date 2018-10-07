/**
 * @description contains Demo event handlers and alertService written in vanialla JS.
 * 
 * html - "../index.js"
 * 
 * customization object: {
 *  title: main title of the notification
 *  message: message to be showm 
 *  stay: time to live
 *  customClass: class to be added for custom styles.
 * }
 */

const theme = {
    images: {
        error: './assets/error.svg',
        success: './assets/success.svg',
        notify: './assets/notify.svg',
        close: './assets/close.svg'
    }
}

/**
 * @description service consumed by event handlers to display notifications
 */
class AlertService {
    /**
     * @description displays alert message (for error, warning type notifications)
     * @param obj has four keys: title, message, stay and customClass
     */
    alert({ title, message, stay, customClass }) {
        alertProvider.showAlert({ title, message, stay, customClass }, theme.images.error, 'error');
    }

    /**
     * @description displays alert message (for success type notifications)
     * @param obj has four keys: title, message, stay and customClass
     */
    success({ title, message, stay, customClass }) {
        alertProvider.showAlert({ title, message, stay, customClass }, theme.images.success, 'success');
    }

    /**
     * @description displays general notification.
     * @param obj has four keys: title, message, stay and customClass
     */
    notify({ title, message, stay, customClass }) {
        alertProvider.showAlert({ title, message, stay, customClass }, theme.images.notify, 'notify');
    }
}

/**
 * @description provider consumed by alert-service to display notifications.
 */
class AlertProvider {
    /**
     * @description uuid provider for alert identification.
     */
    alertUuid() {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return 'alert-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    /**
     * @description displays all kinds of notifications based on arguments
     * @param obj has four keys: title, message, stay and customClass
     * @param svgIcon
     */
    showAlert({ title, message, stay, customClass }, svgIcon, status = 'notify') {
        var alertsContainer;
        const ele = document.getElementsByTagName('body')[0];

        alertsContainer = document.getElementById('uc-alerts-container');
        if (!alertsContainer) {
            alertsContainer = document.createElement('div');
            alertsContainer.setAttribute('id', 'uc-alerts-container');
            alertsContainer.setAttribute('class', 'js-alerts-container');
            ele.appendChild(alertsContainer);
        }

        const alertId = this.alertUuid();

        const alertCloseButtonId = `${alertId}-close-button`;

        const alertHtml = `<div class="alert-container alert-container__${status} ${customClass || ''}" id="${alertId}">
                <img class="alert-container__icon" src="${svgIcon}" alt="" style="" />
                <label>${title}</label>
                <p class="alert-container__message">${message || ''}</p>
                <img src="${theme.images.close}" class="alert-container__close" id="${alertCloseButtonId}" />
            </div>`;

        const parser = new DOMParser();

        const alert = parser.parseFromString(alertHtml, 'text/html');

        if (alertsContainer.firstChild) {
            alertsContainer.insertBefore(alert.body.firstChild, alertsContainer.firstChild);
        } else {
            alertsContainer.appendChild(alert.body.firstChild);
        }

        const closeButton = document.getElementById(alertCloseButtonId);

        closeButton.addEventListener('click', () => { this.closeAlert(alertId) });

        //for stay
        if (stay) {
            setTimeout(() => { this.closeAlert(alertId) }, stay);
        }
    }

    /**
     * @description closes a notification
     * @param id a uuid
     */
    closeAlert(id) {
        var ele = document.getElementById(id);
        if (ele) {
            ele.parentNode.removeChild(ele);
        }
    }
}

const alertProvider = new AlertProvider();

/** 
 * Demo code 
 */
const handleAlert = () => {
    const alertService = new AlertService();

    alertService.alert({
        title: 'Quote of the day.',
        message: 'Your biggest enemy is better than your own untested code.'
    });
};

const handleSuccess = () => {
    const alertService = new AlertService();

    alertService.success({
        title: 'Quote of the day.',
        message: 'A champion is described not by their wins but by how they can recover when they fall.'
    });
}

const handleNotification = () => {
    const alertService = new AlertService();

    alertService.notify({
        title: 'Quote of the day.',
        message: 'Your biggest enemy is better than your own untested code.'
    });
};

const handleNotificationWithTTL = () => {
    const alertService = new AlertService();

    alertService.notify({
        title: 'Quote of the day.',
        message: 'Your biggest enemy is better than your own untested code.',
        stay: 1500
    });
};

const handleNotificationCustomStyles = () => {
    const alertService = new AlertService();

    alertService.notify({
        title: 'Quote of the day.',
        message: 'Your biggest enemy is better than your own untested code.',
        customClass: 'foo'
    });
}
