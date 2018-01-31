const Realm = require('realm');

// Define your models and their properties
const Reminder = {
    name: 'Reminder',
    properties: {
        title: 'string',
        desc: 'string',
        lat: 'float',
        lng: 'float',
        address: 'string',
    }
};

const realm = new Realm({ schema: [Reminder] });

export default class ReminderModel {
    getReminders = () => {
        return Array.from(realm.objects('Reminder'))
    }
    createReminder = (reminder) => {
        try {
            realm.write(() => {
                realm.create('Reminder', reminder);
            });
        } catch (e) {
            console.log("Error on creation");
        }
    }

}
