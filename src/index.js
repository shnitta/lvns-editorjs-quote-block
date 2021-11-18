class LvnsQuoteBlock {
    static get toolbox() {
        return {
            title: '引用ブロック',
            icon: '<img src="assets/icon.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = '';

        const block = document.createElement('div');
        block.classList.add('quote_block');
        block.placeholder = 'Quoted Text...';
        block.contentEditable = true;
        block.innerHTML = this.data.value || '';

        this.wrapper.appendChild(block);

        return this.wrapper;
	}
      
	save(blockContent){
        const input = blockContent.querySelector('[contenteditable]');

        return {
            value: input.innerHTML || ''
        }
	}

    validate(savedData){
        if (!savedData.value.trim()){
          return false;
        }
    
        return true;
      }
}
class LvnsButton {
    static get toolbox() {
        return {
            title: 'ボタン',
            icon: '<img src="assets/button.svg" width="17" height="15">'
        };
    } 

    constructor({data}){
        this.data = data;
        this.wrapper = undefined;
        this.data = {
            label: data.label || '',
            link: data.link || '',
            linkbtn: data.linkbtn !== undefined ? data.linkbtn : false,
        };
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = '';

        const block = document.createElement('button');
        block.classList.add('btn');
        block.classList.add('-green');
        block.classList.add('-round');
        block.classList.add('-article');
        block.classList.add('-center');
        block.placeholder = 'Quoted Text...';
        block.contentEditable = true;
        block.innerHTML = this.data.label || '';

        this.wrapper.appendChild(block);

        return this.wrapper;
	}


  renderSettings(){
    const settings = [
      {
        name: 'linkbtn',
        icon: '<img src="assets/link.svg" width="17" height="15">'
      },
    ];
    const wrapper = document.createElement('div');

    settings.forEach( tune => {
      let button = document.createElement('div');

      button.classList.add('cdx-settings-button');
      button.innerHTML = tune.icon;
      wrapper.appendChild(button);

      button.addEventListener('click', () => {
        this._toggleTune(tune.name);
        button.classList.toggle('cdx-settings-button--active');
      });

    });

    return wrapper;
  }

    /**
   * @private
   * Click on the Settings Button
   * @param {string} tune — tune name from this.settings
   */
     _toggleTune(tune) {
        console.log('Image tune clicked', tune);
        this.data[tune] = !this.data[tune];
        this._acceptTuneView();

      }

    /**
   * Add specified class corresponds with activated tunes
   * @private
   */
    _acceptTuneView() {
        this.settings.forEach( tune => {
            this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]);
        });
    }
      
	save(blockContent){
        const input = blockContent.querySelector('[contenteditable]');

        return Object.assign(this.data, {
            value: input.innerHTML || ''
        });
	}

    validate(savedData){
        if (!savedData.value.trim()){
          return false;
        }
    
        return true;
      }
}