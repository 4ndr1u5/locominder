const Realm = require('realm');

// Define your models and their properties
const Reminder = {
    name: 'Reminder',
    properties: {
        Title: 'string',
        Description: 'string',
        Lattitude: 'string',
        Longitude: 'string',
        Location: 'string',
        // DueDate: 'date'
    }
};

const realm = new Realm({ path: "/Users/Andrius/Desktop/TestRealm.realm", schema: [Reminder] });

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
    deleteReminder = () => {
        realm.delete(book);
    }
}
