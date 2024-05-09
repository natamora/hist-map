import { makeAutoObservable } from "mobx";

export default class MapStore {
    title = 'Test message';
    constructor() {
        makeAutoObservable(this);
    }

    // with arrow fun we dont need to bound action
    setTitle = () => {
        this.title = this.title + '!';
    }
}