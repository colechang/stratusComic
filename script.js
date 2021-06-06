class DomInterface {
    constructor() {
        this.form = document.querySelector('#comic-form');
        this.searchField = document.querySelector('#search-input');

        this.transcript = document.querySelector('#transcript');

        this.title = document.querySelector('#comic-title');
        this.image = document.querySelector('#comic-image');
        this.comicNumber = document.querySelector('#comicNumber');

        this.error = document.querySelector('#error');
        this.formError = document.querySelector('#form-error');
        this.loader = document.querySelector('#loader');
        this.date = document.querySelector('#comic-date');
        

        this.controls = {
            previous: document.querySelector('#request-prev'),
            next: document.querySelector('#request-next'),
            random: document.querySelector('#request-random'),
            first: document.querySelector('#request-first'),
            last: document.querySelector('#request-last'),
        };
    }

    hideLoader() {
        this.loader.classList.remove('d-flex');
        this.loader.classList.add('d-none');
    }

    showLoader() {
        this.loader.classList.remove('d-none');
        this.loader.classList.add('d-flex');
    }

    showComics(data) {
        const { title, img, num, year, month, day,transcript} = data;

        this.title.innerHTML = title;
        this.image.src = img;
        var foo = ''+num;
        var test = ''+month+'/'+day+'/'+year;
        this.comicNumber.innerHTML = foo;
        this.date.innerHTML = test;
        this.transcript.textContent =  this.parseTranscript(transcript);

        if (data.alt) this.image.alt = data.alt;

        this.hideLoader(); 
    }

    parseTranscript(script){
        const arr = ['[',']','{','}','<','>'];
        for(var i =0;i<script.length;i++){
            var temp = script.charAt(i);
            if(temp.localeCompare(arr[0])==0){
               script = script.substring(0,i-1)+script.substring(i +1);
            }
            else if(temp.localeCompare(arr[1])==0){
                script = script.substring(0,i-1)+script.substring(i +1);
            }
            else if(temp.localeCompare(arr[2])==0){
                script = script.substring(0,i-1)+script.substring(i+1);
            }
            else if(temp.localeCompare(arr[3])==0){
                script = script.substring(0,i-1)+script.substring(i +1);
            }
            else if(temp.localeCompare(arr[4])==0){ 
                script = script.substring(0,i-1)+script.substring(i +1);
            }
            else if(temp.localeCompare(arr[5])==0){ 
                script = script.substring(0,i-1)+script.substring(i +1);
            }
        }
        return script;
    }

}

class RequestController {
    constructor() {
        this.DomInterface = new DomInterface();
        this.corsHeader = 'https://the-ultimate-api-challenge.herokuapp.com';
        this.apiUrl = 'https://xkcd.com';
        this.apiUrlFormat = 'info.0.json';
        this.superAgent = superagent;

        this.currentComicsNumber = 0;
        this.maxComicsNumber = 0;

        this.getCurrentComics();
        this.registerEvents();
    }

    setMaxComicsNumber(number) {
        this.maxComicsNumber = number;
    }

    setCurrentComicsNumber(number) {
        this.currentComicsNumber = number;
    }

    getRandomComicsNumber() {
        const min = 1;
        const max = this.maxComicsNumber;
        const randomNumber = Math.floor(Math.random() * (max - min)) + min;
        return randomNumber;
    }

    getCurrentComics() {
        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${this.apiUrlFormat}`;

        this.superAgent.get(requestUrl).end((error, response) => {
            const data = response.body;

            this.DomInterface.showComics(data);
            this.setCurrentComicsNumber(data.num);
            this.setMaxComicsNumber(data.num);
        });
    }

    getComicsByNumber(number) {
        
        this.DomInterface.showLoader();

        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${number}/${this.apiUrlFormat}`;

        this.superAgent.get(requestUrl).end((error, response) => {

            const data = response.body;

            this.setCurrentComicsNumber(data.num);
            this.DomInterface.showComics(data);
        });
    }

    requestPreviousComics() {
        const requestedComicsNumber = this.currentComicsNumber - 1;
        console.log({ requestedComicsNumber });
        if (requestedComicsNumber < 1) return;

        this.getComicsByNumber(requestedComicsNumber);
    }

    requestNextComics() {
        const requestedComicsNumber = this.currentComicsNumber + 1;
        if (requestedComicsNumber > this.maxComicsNumber) return;

        this.getComicsByNumber(requestedComicsNumber);
    }

    requestComicsById(e) {
        e.preventDefault();

        const query = this.DomInterface.searchField.value;
        if (!query || query === '') {
            return;
        }
        if (query < 1 || query > this.maxComicsNumber) {
            return this.DomInterface.showFormError(`Try a number between 1 and ${this.maxComicsNumber}`);
        }

        this.getComicsByNumber(query);
    }

    registerEvents() {
        this.DomInterface.controls.random.addEventListener('click', () =>
            this.getComicsByNumber(this.getRandomComicsNumber())
        );

        this.DomInterface.controls.first.addEventListener('click', () => this.getComicsByNumber(1));
        this.DomInterface.controls.last.addEventListener('click', () => this.getComicsByNumber(this.maxComicsNumber));

        this.DomInterface.controls.previous.addEventListener('click', () => this.requestPreviousComics());
        this.DomInterface.controls.next.addEventListener('click', () => this.requestNextComics());

        this.DomInterface.form.addEventListener('submit', e => this.requestComicsById(e));
    }
}
const comics = new RequestController();