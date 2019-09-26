import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state:{
        dialogsPage: {
            dialogs: [
                {'id': 1, 'name': 'Влад', 'date': '9:21 PM', 'message': 'порно ссылка', 'avatarUrl': 'https://lh3.google.com/u/0/d/12GJMuL0nWQmsn-FpoEOjqpnbyhf8L-WI=w1920-h1080-iv1'},
                {'id': 2, 'name': 'Лена', 'date': '9:21 PM', 'message': 'Oh! that\'s great!', 'avatarUrl': 'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
                {'id': 3, 'name': 'Виктория', 'date': '9:21 PM', 'message': 'Разработка соц сети идёт на ура', 'avatarUrl': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
                {'id': 4, 'name': 'Сергей', 'date': '9:21 PM', 'message': 'щас бы тяночку', 'avatarUrl': 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
                {'id': 5, 'name': 'Олег', 'date': '9:21 PM', 'message': 'привет, пикабу!', 'avatarUrl': 'https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
                {'id': 6, 'name': 'Юрий', 'date': '9:21 PM', 'message': 'ищу работу на React', 'avatarUrl': 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
                {'id': 7, 'name': 'Николай', 'date': '9:21 PM', 'message': 'продам гараж', 'avatarUrl': 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
            ],
            messages: [
                {'id': 1, 'key': 'first', 'name': 'Влад', 'date': '9:21:14 PM', 'text': 'Hi there!', 'avatarUrl': 'https://lh3.google.com/u/0/d/12GJMuL0nWQmsn-FpoEOjqpnbyhf8L-WI=w1920-h1080-iv1'},
                {'id': 2, 'key': 'first', 'name': 'Влад', 'date': '9:21:20 PM', 'text': 'Hi, I\'m learning React right now!', 'avatarUrl': 'https://lh3.google.com/u/0/d/12GJMuL0nWQmsn-FpoEOjqpnbyhf8L-WI=w1920-h1080-iv1'},
                {'id': 3, 'key': 'second', 'name': 'Лена', 'date': '9:22:03 PM', 'text': 'Oh! that\'s great!', 'avatarUrl': 'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {'id': 1, 'message': 'This is my first post', 'likesCount': 3},
                {'id': 2, 'message': 'Hi, I\'m learning ReactJs', 'likesCount': 5}
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;