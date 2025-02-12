class cellSys{
	constructor(canvas,controls,imagecont){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.imgcont = imagecont;
		this.controls = controls;
		this.currSlice = 0;
		this.texta = 1;
		this.slices = [Math.PI*0.80,Math.PI*0.75,Math.PI*0.25,Math.PI*(0.1/3),Math.PI*(0.1/3),Math.PI*(0.1/3),Math.PI*(0.1/3),Math.PI*(0.1/3),Math.PI*(0.1/3)];
		this.sliceclr = ['blue','orange','green','purple','#00bbff','red','yellow','pink','#00ff00'];
		this.arcStart = Math.PI + (Math.PI - this.slices[this.currSlice])/2;
		this.textClr = 'rgba(255,255,255,0.8)';
		this.cancer = false;
		this.slicetext = [
			'• Cell growth occurs and the cell grows in size.\n• Proteins and organelles are synthesized that are necessary for cell division.\n• Contains the first of the cell cycles checkpoints.',
			'• Checkpoint (G1 checkpoint) to assess if the cell is ready to proceed  to the next phase.\n• Checks the cell to tell if the cell has sufficient reserves and is the correct size.\n• It also checks for damage in the DNA that is needed in order to grow.\n• If the check is failed the cell will enter G0.',
			'• DNA replication, During the Synthesis phase the cell will create copies of all of its DNA. These DNA will split and then each half will tie together with the opposite from the other cell. This creates two copies that each have half the original and half of the new. Therefore Semi conservative.\n• Sister chromatids are formed, connected at the centromere.\n• The cell continues to synthesize proteins needed for the cell to function.',
			'• The cell continues to grow in size and prepares to begin its mitosis.\n• The cell continues to make proteins but specifically ones designed for mitosis.',
			'• During the G2 checkpoint the cell checks that the cell has properly replicated all of its DNA needed for mitosis.\n• The G2 checkpoint is unable to pause the cells functions and even if the cell has damage it can’t stop it\n• Instead the cell will attempt to undergo small repairs quickly but if they fail the cell will continue on with its damage.',
			'• Chromatin packs into chromosomes for safe transport.\n• The nuclear envelope breaks down and fades from the cell.\n• Centrioles only within animal cells begin to move to the opposite polars of the cell.\n• The mitotic spindle begins to form, a large web of spindle fibers that form during mitosis.',
			'• Chromosomes are fully condensed.\n• Kinetochores appear at the centromeres.\n• Microtubules from the mitotic spindle attach to the kinetochores.',
			'• Chromosomes align in the center of the cell creating the metaplate.\n• The chromosomes are connected to the centrioles by spindle fibers that will stretch across the cell.',
			'• The metaphase checkpoint ensures that all chromosomes are correctly attached to the spindle fibers.',
			'• Sister chromatids separate and move to opposite poles of the cell.\n• The spindle fibers shorten. ',
			'• The chromosomes unpack and return to being individual chromatin..\n• The nuclear envelope reforms around each set of chromosomes.\n• The mitotic spindle created of all of the spindle fibers is unconstructed.',
			'• Cytokinesis is the cleaving and separation of the cell.\n• Plant and animal cells undergo Cytokinesis differently\n    ◦ In animal cells they have no cell wall, This allows them to be less rigid and they simple fold in on themselves and pinch to separate the two new daughter that have been formed\n    ◦ In a plant cell they have to have a cell wall. This means during cell division a new cell wall is created between the two cells before the cleaving could begin.',
			'• During Phase G0 the cell has failed the G1 checkpoint and is now paused.\n• G0 can lead to 3 different outcomes for the cell.\n    ◦ If the cell remains damaged it may go dormant in order to repair itself\n    ◦ If the cell remains damaged yet continues to function anyway it may grow too large and undergo Apoptosis.\n    ◦ If the damaged cell is repaired and all of its needs are met then it will return to regular cell life.',
			'You have failed either the G2 Checkpoint or M Checkpoint.\nThis means you have potentially developed CANCER!!!'
		];
		this.slicetitle = [
			'G1 Phase',
			'G1 Checkpoint',
			'S Phase',
			'G2 Phase',
			'G2 Checkpoint',
			'Prophase',
			'Prometaphase',
			'Metaphase',
			'M Checkpoint',
			'Anaphase',
			'Telophase',
			'Cytokenesis',
			'G0 Phase',
			'Cancer!'
		];
		this.sliceimgs = [
			'g1.png',
			'https://cdn.kastatic.org/ka-perseus-images/9c6a08e9311df5529c5899ec3639a29048509e44.png',
			'https://upload.wikimedia.org/wikipedia/commons/7/70/DNA_replication_split.svg',
			'https://cdn.kastatic.org/ka-perseus-images/41ec3c3648ff73578d8f2c7f34b26f41e9f8ce94.png',
			'https://cdn.kastatic.org/ka-perseus-images/3af02c1c6486f416ccaa4c328232fab788639a2c.png',
			'https://cdn.kastatic.org/ka-perseus-images/f32963379290b822763614b2edd19ba14b9c929a.png',
			'https://upload.wikimedia.org/wikipedia/commons/a/a8/Prometaphase.svg',
			'meta.png',
			'https://cdn.kastatic.org/ka-perseus-images/df15c063ad46ea546a83d2a3a6117349d144d135.png',
			'https://upload.wikimedia.org/wikipedia/commons/d/d6/Mitotic_Anaphase.svg',
			'telo.png',
			'https://upload.wikimedia.org/wikipedia/commons/6/69/Cytokinesis_illustration.svg',
			'g0.png',
			'https://cdn.kastatic.org/ka-perseus-images/3ce36e4344afc09823195b45d8ca765191f2e0d0.png',
		];
		this.updDim = this.updDim.bind(this);
		this.step = this.step.bind(this);
		this.shutDown = this.shutDown.bind(this);
		this.setCancer = this.setCancer.bind(this);
		controls.children[0].addEventListener('click',this.step);
		window.addEventListener('resize',this.updDim);
		this.updDim();
	}
	updDim(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.arcx = this.canvas.width/2;
		this.arcy = this.canvas.height*1.25;
		this.arcr = this.canvas.height*0.75; //Math.max(this.canvas.width,this.canvas.height);
		this.redraw();
	}
	redraw(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		let startarc = this.arcStart;
		for(let i=0;i<this.slices.length;i++){
			this.ctx.fillStyle = this.sliceclr[i];
			this.ctx.beginPath();
			this.ctx.arc(this.arcx,this.arcy,this.arcr,startarc,startarc+this.slices[i]);
			this.ctx.lineTo(this.arcx,this.arcy);
			this.ctx.fill();
			startarc += this.slices[i];
		}
		const grad = this.ctx.createLinearGradient(this.canvas.width/2,this.canvas.height,this.canvas.width/2,0);
		grad.addColorStop(0,'rgba(0,0,0,0.8)');
		grad.addColorStop(0.5,'rgba(0,0,0,0)');
		this.ctx.fillStyle = grad;
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle = this.textClr;
		this.ctx.font = '60px Arial,sans-serif';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.slicetitle[this.currSlice],this.canvas.width/2,this.canvas.height*0.75);
		this.ctx.font = '15px Arial,sans-serif';
		this.ctx.textAlign = 'left';
		const lines = this.slicetext[this.currSlice].split('\n');
		let ydown = 50;
		for(let i=0;i<lines.length;i++){
			const wlines = this.getWrapped(lines[i],this.canvas.width/2-10);
			for(let j=0;j<wlines.length;j++){
				this.ctx.fillText(wlines[j],10,ydown);
				ydown+=20;
			}
			ydown+=5;
		}
	}
	async step(){
		this.controls.classList.add('hid');
		this.imgcont.parentElement.classList.add('hid');
		const rslice = this.currSlice;
		this.currSlice = this.currSlice < 0 ? Math.abs(this.currSlice) : this.currSlice;
		await this.startTextFadeOut();
		//alert('hi');
		this.currSlice = rslice;
		await this.moveNext();
		//alert('hi');
		this.controls.innerHTML = '';
		switch(this.currSlice){
			case -1:
				this.currSlice = 12;
				await this.moveOut();
				break;
			case 11:
				//alert(this.currSlice);
				this.currSlice = 0;
				this.arcStart = Math.PI + (Math.PI - this.slices[this.currSlice])/2;
				if(this.cancer){
					await this.moveOut();
					this.currSlice = 13;
				}
				//console.log(this.currSlice);
				break;
			case 12:
				this.currSlice = 1;
				await this.moveIn();
				break;
			case 13:
				this.currSlice = 0;
				await this.moveIn();
				break;
			default:
				this.currSlice+=1;
		}
		switch(this.currSlice){
			case 12:
				const chkbtn = document.createElement('button');
				chkbtn.classList.add('button');
				chkbtn.innerText = 'Check';
				chkbtn.addEventListener('click',this.step);
				this.controls.appendChild(chkbtn);
				break;
			case 13:
				const resbtn = document.createElement('button');
				resbtn.classList.add('button');
				resbtn.innerText = 'Reset';
				resbtn.addEventListener('click',this.step);
				this.controls.appendChild(resbtn);
				break;
			case 1:
			case 4:
			case 8:
				const fbtn = document.createElement('button');
				fbtn.classList.add('button');
				fbtn.innerText = 'Fail';
				switch(this.currSlice){
					case 1:
						fbtn.addEventListener('click',this.shutDown);
						break;
					default:
						fbtn.addEventListener('click',this.setCancer);
				}
				this.controls.appendChild(fbtn);
			default:
				const contbtn = document.createElement('button');
				contbtn.classList.add('button');
				contbtn.innerText = 'Next';
				contbtn.addEventListener('click',this.step);
				this.controls.appendChild(contbtn);
		}
		//this.imgcont.style.background = 'url("'+this.sliceimgs[this.currSlice]+'")';
		this.imgcont.src = this.sliceimgs[this.currSlice];
		//alert(this.imgcont.style.backgroundImage);
		//console.log(this.currSlice);
		this.controls.classList.remove('hid');
		this.imgcont.parentElement.classList.remove('hid');
		await this.startTextFadeIn();
	}
	async setCancer(){
		this.cancer = true;
		await this.step();
	}
	async shutDown(){
		this.currSlice = -1;
		await this.step();
	}
	async moveOut(){
		this.currSlice = 12;
		for(let i=0;i<60;i++){
			this.arcx += (this.canvas.width*2.25)/60;
			this.redraw();
			await new Promise(res=>{requestAnimationFrame(res);});
		}
	}
	async moveIn(){
		for(let i=0;i<60;i++){
			this.arcx -= (this.canvas.width*2.25)/60;
			this.redraw();
			await new Promise(res=>{requestAnimationFrame(res);});
		}
	}
	async moveNext(){
		switch(this.currSlice){
			case 0:
			case 7:
			case 3:
			case 12:
			case -1:
			case 13:
				return;
		}
		const rslice = this.currSlice > 0 ? (this.currSlice > 3 ? (this.currSlice > 7 ? this.currSlice-3 : this.currSlice-2) : this.currSlice-1) : this.currSlice;
		const fullDeg = (this.slices[rslice]+(Math.PI - this.slices[rslice])/2)-(Math.PI - this.slices[(rslice == 8 ? 0 : rslice+1)])/2;
		const origArc = this.arcStart;
		for(let i=0;i<60;i++){
			this.arcStart = origArc-(fullDeg/100)*(100/60)*(i+1);
			this.redraw();
			await new Promise(res=>{requestAnimationFrame(res);});
		}
	}
	async startTextFadeOut(){
		let alpha = 1;
		for(let i=0;i<15;i++){
			alpha-=1/15;
			this.textClr = 'rgba(255,255,255,'+alpha.toString()+')';
			this.redraw();
			await new Promise(res=>{requestAnimationFrame(res);});
		}
	}
	async startTextFadeIn(){
		let alpha = 0;
		for(let i=0;i<15;i++){
			alpha+=1/15;
			this.textClr = 'rgba(255,255,255,'+alpha.toString()+')';
			this.redraw();
			await new Promise(res=>{requestAnimationFrame(res);});
		}
	}
	getWrapped(str,width){
		//https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
		const words = str.split(' ');
		const lines = [];
		let currline = words[0];
		
		for(let i=1;i<words.length;i++){
			if(this.ctx.measureText(currline+" "+words[i]).width>width){
				lines.push(currline);
				currline = words[i];
			}else{
				currline += " "+words[i];
			}
		}
		lines.push(currline);
		return lines;
	}
}

const system = new cellSys(document.getElementById('cell-maincanv'),document.getElementById('cell-maincont'),document.getElementById('cell-mainimg'));
