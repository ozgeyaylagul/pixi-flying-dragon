const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;


loader.add('tileset', './images/drags.json')
.load(setup);

function setup(loader, resources) {
    const textures = [];
    for(let i = 1; i < 13; i++) {
        const texture = PIXI.Texture.from(`drag${i}.png`);
        textures.push(texture);
    }
    const drag = new PIXI.AnimatedSprite(textures);
    drag.position.set(800, 300);
    drag.scale.set(2, 2);
    app.stage.addChild(drag);
    drag.play();
    drag.animationSpeed = 0.1;

}


const cloudsTexture = PIXI.Texture.from('./images/clouds.png');
const cloudsSprite = new PIXI.TilingSprite(
    cloudsTexture,
    app.screen.width,
    app.screen.height
);

cloudsSprite.tileScale.set(0.5, 0.5);

app.ticker.add(function() {
    cloudsSprite.tilePosition.x += 1;
});

app.stage.addChild(cloudsSprite);

const sound = new Howl({
    src: ['./sound/pelimusaa.wav']
});

sound.play();