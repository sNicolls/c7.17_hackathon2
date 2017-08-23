function makeParticlesOnElement(element){
    var targetElement = document.querySelector('body');
    var bounds = element.getBoundingClientRect();

    function makeEmitter(options){
        //Here's an object of default options, just in case you forgot to pass in your own.
        var defaultOptions = {
            //location of the particle emitter. Technically, the location at which all spawned particles start
            x: 0,
            y: 0,

            //unused
            emmiter_duration: 1000,

            //because everything runs out of ammo eventually
            totalParticles: 1000,

            //particles don't just spawn all day every day. a function called checkToMakeParticles rolls the dice and compares it to this value.
            // This process happens once every chanceTime milliseconds.
            percentChance: .5,

            //time for one animation cycle to complete
            animationTime: 10,

            //how often to check to make a particle
            chanceTime: .1,
            rotation_min: 0,
            rotation_max: 0,

            //how long the particle lives before it is removed
            particle_life: 3000,

            //unused
            color: {r:255, g:255, b:255, o:.5},
//                velocity: 10, //pixels per second

            max_velocity : 10,
            min_velocity : 10,

            gravity: 0.2,


            start_angle: 0,
            end_angle: 90,


            height: 3,
            width: 3,
            opacity_start: 1, //opacity at start of run
            opacity_end: 0,  //opacity at end of run
            fade_start_time: 0, //% of time to start fading
            fade_end_time: 1,  //% of time to end fading
            birth_scale: 0, //how big to start at
            maturity_scale: 1, //how big to be when it matures
            maturity_time_end: .1, //what percent of particle time is it considered to be mature
            death_scale: 1.2, //how big to be by the time it terminates
            death_time_start: .8 //what percentage of time to start its death growth
        }
        for(var i in defaultOptions){
            if(options[i]===undefined){
                options[i] = defaultOptions[i];
            }
        }
        options.particlesRemaining = options.totalParticles;
        function checkToMakeParticle(options){
            var chance = Math.random();
            if(chance < options.percentChance){
                //figure out a random angle between given parameters
                var angle = Math.random() * (options.end_angle - options.start_angle) + options.start_angle;

                //figure out a random velocity between given parameters
                var velocity = Math.random() * (options.max_velocity - options.min_velocity) + options.min_velocity;

                //make the particle based on everything in an options object
                var particle= makeParticle({
                    x: options.x,
                    y: options.y,
                    color: options.color,
                    animationTime: options.animationTime,
                    angle: angle,
                    velocity: velocity,
                    velocity_per_frame: velocity / (1000 / options.animationTime),
                    particle_life: options.particle_life,
                    gravity: options.gravity,
                    height: options.height,
                    width: options.width,
                    rotation_min: options.rotation_min,
                    rotation_max: options.rotation_max,
                    opacity_start: options.opacity_start,
                    opacity_end: options.opacity_end,
                    fade_start_time: options.fade_start_time,
                    fade_end_time: options.fade_end_time,
                    maturity_scale: options.maturity_scale,
                    maturity_time_end: options.maturity_time_end,
                    death_scale: options.death_scale,
                    death_time_start: options.death_time_start
                });

                //targetElement in this case is defined as the body. All of these particle dom elements are being added to the beginning of the body
                targetElement.insertBefore(particle,targetElement.childNodes[0]);

                //there is now one less particle!
                options.particlesRemaining--;
            }

            //after the first check to make particle, check if you're out of ammo before even checking if you should make a particle in the first place
            if(options.particlesRemaining>0){
                setTimeout(checkToMakeParticle,options.chanceTime, options);
            }
        }

        setTimeout(checkToMakeParticle, options.chanceTime, options);

        //definition for actually making the particles (not just checking if you should make them)
        function makeParticle(params){
            //Dan didn't feel like using jQuery apparently.

            //the particle is a div.
            var particle = document.createElement('div');

            //it has a class of particle.
            particle.classList.add('particle');

            //its position is fixed
            particle.style.position = 'fixed';

            //a params object is passed in. Really, it's just the parameter for an options object argument.

            //it starts at the x value that's passed in. all based on pixels.
            particle.style.left = params.x + 'px';
            particle.style.top = params.y + 'px';

            //particle.style.backgroundColor = 'rgba('+params.color.r+','+params.color.g+','+params.color.b+','+params.color.o+')';

            //width and height are passed in and based on pixels
            particle.style.width = params.width+'px';
            particle.style.height = params.height+'px';

            //it's at some random rotation. Completely random, unlike the starting direction, which is semi random
            var rotationDegrees = Math.random()*360;

            //transform is a property that can rotate the object. The string passed as a parameter takes care of that.
            particle.style.transform = 'rotate3D(0,0,1,'+rotationDegrees+'deg)';

            //if particle.style.opacity is undefined, currentOpacity will be set to 1 instead.
            var currentOpacity = particle.style.opacity || 1;

            var currentX = params.x;
            var currentY = params.y;

            //angle is in degrees. Math.cos and Math.sin need it to be in radians. Convert degrees to radians and use radians from now on
            var radians = params.angle * (Math.PI/180);
//                debugger;

            var xVelocity = Math.cos(radians) * params.velocity_per_frame;
            var yVelocity = Math.sin(radians) * params.velocity_per_frame;

            var lifeTime = params.particle_life;
            var rotation_delta = Math.random()*(params.rotation_max - params.rotation_min);
            /*
                 opacity_start: .7, //opacity at start of run
             opacity_end: 0,  //opacity at end of run
             fade_start_time: .75 //% of time to start fading
             fade_end_time: 1
             */
            var animationTime = params.animationTime;
            ;
            var fade_start = lifeTime * params.fade_start_time;
            var fade_end = lifeTime * params.fade_end_time;
            var fade_time_difference = fade_end - fade_start;
//                debugger
            var fade_delta = (params.opacity_start - params.opacity_end) / (fade_time_difference / animationTime) ;
            /*
                  birth_scale: 0, //how big to start at
                  maturity_scale: 1, //how big to be when it matures
                  maturity_time_end: .1, //what percent of particle time is it considered to be mature
                  death_scale: 1.2, //how big to be by the time it terminates
                  death_time_start: .8 //what percentage of time to start its death growth
             */
            // var maturity_delta = params.maturity_scale - params.birth_scale;
            // var maturity_time = lifeTime * params.maturity_time_end;
            //   var sizeDelta = maturity_delta / (lifeTime / maturity_time);
            //   function stopMaturitySizeChange(){
            //      nextCheckTime = lifeTime * params.death_time_start;
            //      nextCheckAction = startDeathSizeChange;
            //   }
            //   function startDeathSizeChange(){
            //   }
            //   var nextCheckTime = lifeTime * params.maturity_time_end;
            //   var nextCheckAction = stopMaturitySizeChange;
            function animateParticle(){
//                    debugger;
                currentX += xVelocity;
                currentY += yVelocity;
                rotationDegrees += rotation_delta;
                particle.style.left = currentX+'px';
                particle.style.top = currentY+'px';
                particle.style.transform = 'rotate3D(0,0,1,'+rotationDegrees+'deg)';
                currentOpacity -= fade_delta;
                particle.style.opacity = currentOpacity;

                //the yVelocity itself is constantly increasing. This is how gravity works IRL
                yVelocity += params.gravity;
                lifeTime -= params.animationTime;
                //if(lifeTime)
                if(lifeTime>0){
                    setTimeout(animateParticle,params.animationTime);
                } else {
                    particle.parentNode.removeChild(particle);
                }
            }
            setTimeout(animateParticle,params.animationTime);
            return particle;
        }

    }
    makeEmitter({
        x: 500, y: 100,
        color:{r: 255, g: 0, b:0, o:1},
        gravity: .2,height: 180, width: 180,

        max_velocity: 800,
        min_velocity: 20,


        start_angle: 225,
        end_angle:315,


        percentChance: 1,
        rotation_min: .05,
        rotation_max: 2,
        chanceTime: 0,
        totalParticles: 30
    })

}
/*
{
  bottom: 148.70738220214844,
  height: 140.71022033691406,
  left: 7.997159004211426,
  right: 380.1846618652344,
  top: 7.997159004211426,
  width: 372.1875
}
*/