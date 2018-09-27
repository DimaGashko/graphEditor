class FPSMeter { 
   private fps: number = 0;

   constructor() { 
      this.start();
   }

   private set(fps: number) { 
      this.fps = fps;
   }

   public get(): number {
      return this.fps;
   }

   private start() { 
      var fps = this;

      let timeStart = 0;
      let counter = 0;

      requestAnimationFrame(function tik() { 
         let now = performance.now();
         let duration = now - timeStart;

         if(duration < 100) {
            counter++;
            
         } else {           
            fps.set(counter * 10);
            counter = 0;
            timeStart = now;   
         }

         requestAnimationFrame(tik);
      });
      
   }
}

const FPS = new FPSMeter();

export default FPS;
