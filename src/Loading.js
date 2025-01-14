import React, { useRef, useEffect } from "react";
import "./Loading.css";

function SwirlyLoading() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 1) Grab the canvas + getContext + set initial width/height
    // --------------------------------------------------------------------------------
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);

    // We'll store a bunch of variables in an object to avoid polluting scope
    const opts = {
      range: 180,
      baseConnections: 3,
      addedConnections: 5,
      baseSize: 5,
      minSize: 1,
      dataToConnectionSize: 0.4,
      sizeMultiplier: 0.7,
      allowedDist: 40,
      baseDist: 40,
      addedDist: 30,
      connectionAttempts: 100,

      dataToConnections: 1,
      baseSpeed: 0.04,
      addedSpeed: 0.05,
      baseGlowSpeed: 0.4,
      addedGlowSpeed: 0.4,

      rotVelX: 0.003,
      rotVelY: 0.002,

      repaintColor: "#111",
      connectionColor: "hsla(200,60%,light%,alp)",
      rootColor: "hsla(0,60%,light%,alp)",
      endColor: "hsla(160,20%,light%,alp)",
      dataColor: "hsla(40,80%,light%,alp)",

      wireframeWidth: 0.1,
      wireframeColor: "#88f",

      depth: 250,
      focalLength: 250,
      vanishPoint: {
        x: w / 2,
        y: h / 2,
      },
    };

    const squareRange = opts.range * opts.range;
    const squareAllowed = opts.allowedDist * opts.allowedDist;
    const mostDistant = opts.depth + opts.range;

    // We'll define some needed vars to track rotation
    let sinX = 0;
    let sinY = 0;
    let cosX = 0;
    let cosY = 0;
    let tick = 0;

    // We’ll store all “Connection” + “Data” objects in arrays
    const connections = [];
    const toDevelop = [];
    const data = [];
    const all = [];

    let animating = false;

    // --------------------------------------------------------------------------------
    // 2) Define the constructor functions from the CodePen
    //    We'll keep them inside useEffect so they can access "ctx" etc.
    // --------------------------------------------------------------------------------

    function Connection(x, y, z, size) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;

      this.screen = {};
      this.links = [];
      this.isEnd = false;

      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
    }
    Connection.prototype.link = function () {
      if (this.size < opts.minSize) {
        this.isEnd = true;
        return;
      }

      const links = [];
      const connectionsNum =
        opts.baseConnections + Math.random() * opts.addedConnections | 0;
      let attempt = opts.connectionAttempts;

      const pos = {};

      while (links.length < connectionsNum && --attempt > 0) {
        const alpha = Math.random() * Math.PI;
        const beta = Math.random() * 2 * Math.PI;
        const len = opts.baseDist + opts.addedDist * Math.random();

        const cosA = Math.cos(alpha);
        const sinA = Math.sin(alpha);
        const cosB = Math.cos(beta);
        const sinB = Math.sin(beta);

        pos.x = this.x + len * cosA * sinB;
        pos.y = this.y + len * sinA * sinB;
        pos.z = this.z + len * cosB;

        // Check if inside "range" (the sphere boundary)
        if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {
          let passedExisting = true;
          let passedBuffered = true;

          for (let i = 0; i < connections.length; i++) {
            if (squareDist(pos, connections[i]) < squareAllowed) {
              passedExisting = false;
              break;
            }
          }
          if (passedExisting) {
            for (let i = 0; i < links.length; i++) {
              if (squareDist(pos, links[i]) < squareAllowed) {
                passedBuffered = false;
                break;
              }
            }
          }
          if (passedExisting && passedBuffered) {
            links.push({ x: pos.x, y: pos.y, z: pos.z });
          }
        }
      }

      if (links.length === 0) {
        this.isEnd = true;
      } else {
        for (let i = 0; i < links.length; i++) {
          const pos = links[i];
          const connection = new Connection(
            pos.x,
            pos.y,
            pos.z,
            this.size * opts.sizeMultiplier
          );

          this.links[i] = connection;
          all.push(connection);
          connections.push(connection);
        }
        for (let i = 0; i < this.links.length; i++) {
          toDevelop.push(this.links[i]);
        }
      }
    };
    Connection.prototype.step = function () {
      this.setScreen();
      this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor)
        .replace("light", 30 + ((tick * this.glowSpeed) % 30))
        .replace("alp", 0.2 + (1 - this.screen.z / mostDistant) * 0.8);

      for (let i = 0; i < this.links.length; i++) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
      }
    };
    Connection.rootStep = function () {
      this.setScreen();
      this.screen.color = opts.rootColor
        .replace("light", 30 + ((tick * this.glowSpeed) % 30))
        .replace("alp", (1 - this.screen.z / mostDistant) * 0.8);

      for (let i = 0; i < this.links.length; i++) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
      }
    };
    Connection.prototype.draw = function () {
      ctx.fillStyle = this.screen.color;
      ctx.beginPath();
      ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, 2 * Math.PI);
      ctx.fill();
    };
    Connection.prototype.setScreen = function () {
      setScreenPosition(this);
    };

    function Data(connection) {
      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
      this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();
      this.screen = {};
      this.setConnection(connection);
    }
    Data.prototype.reset = function () {
      this.setConnection(connections[0]);
      this.ended = 2; // it will skip drawing for 2 frames
    };
    Data.prototype.step = function () {
      this.proportion += this.speed;

      if (this.proportion < 1) {
        this.x = this.ox + this.dx * this.proportion;
        this.y = this.oy + this.dy * this.proportion;
        this.z = this.oz + this.dz * this.proportion;
        this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize;
      } else {
        this.setConnection(this.nextConnection);
      }

      this.screen.lastX = this.screen.x;
      this.screen.lastY = this.screen.y;
      this.setScreen();
      this.screen.color = opts.dataColor
        .replace("light", 40 + ((tick * this.glowSpeed) % 50))
        .replace("alp", 0.2 + (1 - this.screen.z / mostDistant) * 0.6);
    };
    Data.prototype.draw = function () {
      if (this.ended) {
        return --this.ended;
      }
      ctx.beginPath();
      ctx.strokeStyle = this.screen.color;
      ctx.lineWidth = this.size * this.screen.scale;
      ctx.moveTo(this.screen.lastX, this.screen.lastY);
      ctx.lineTo(this.screen.x, this.screen.y);
      ctx.stroke();
    };
    Data.prototype.setConnection = function (connection) {
      if (connection.isEnd) {
        this.reset();
      } else {
        this.connection = connection;
        this.nextConnection = connection.links[(connection.links.length * Math.random()) | 0];

        this.ox = connection.x;
        this.oy = connection.y;
        this.oz = connection.z;
        this.os = connection.size;

        this.nx = this.nextConnection.x;
        this.ny = this.nextConnection.y;
        this.nz = this.nextConnection.z;
        this.ns = this.nextConnection.size;

        this.dx = this.nx - this.ox;
        this.dy = this.ny - this.oy;
        this.dz = this.nz - this.oz;
        this.ds = this.ns - this.os;

        this.proportion = 0;
      }
    };
    Data.prototype.setScreen = function () {
      setScreenPosition(this);
    };

    // Helper to compute distance squared
    function squareDist(a, b) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      return dx * dx + dy * dy + dz * dz;
    }

    // Helper to set the .screen.x, .screen.y, .screen.z, etc.
    function setScreenPosition(item) {
      let x = item.x;
      let y = item.y;
      let z = item.z;

      // rotate on X axis
      const Y = y;
      y = Y * cosX - z * sinX;
      z = z * cosX + Y * sinX;

      // rotate on Y axis
      const Z = z;
      z = Z * cosY - x * sinY;
      x = x * cosY + Z * sinY;

      item.screen.z = z + opts.depth; // push back by depth
      z += opts.depth; // for scale calculations

      const scale = opts.focalLength / z;
      item.screen.scale = scale;
      item.screen.x = opts.vanishPoint.x + x * scale;
      item.screen.y = opts.vanishPoint.y + y * scale;
    }

    // --------------------------------------------------------------------------------
    // 3) Initialization function (like `init()` in CodePen)
    // --------------------------------------------------------------------------------
    function init() {
      connections.length = 0;
      data.length = 0;
      all.length = 0;
      toDevelop.length = 0;

      // create the root connection
      const root = new Connection(0, 0, 0, opts.baseSize);
      root.step = Connection.rootStep; // special step function
      connections.push(root);
      all.push(root);

      // generate children
      root.link();

      while (toDevelop.length > 0) {
        toDevelop[0].link();
        toDevelop.shift();
      }

      if (!animating) {
        animating = true;
        anim();
      }
    }

    // --------------------------------------------------------------------------------
    // 4) The main animation loop (`anim()`)
    // --------------------------------------------------------------------------------
    function anim() {
      const rafId = requestAnimationFrame(anim);

      // clear with a dark color each frame
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = opts.repaintColor;
      ctx.fillRect(0, 0, w, h);

      tick++;

      // update rotation
      const rotX = tick * opts.rotVelX;
      const rotY = tick * opts.rotVelY;
      cosX = Math.cos(rotX);
      sinX = Math.sin(rotX);
      cosY = Math.cos(rotY);
      sinY = Math.sin(rotY);

      // add more data lines if needed
      if (data.length < connections.length * opts.dataToConnections) {
        const datum = new Data(connections[0]);
        data.push(datum);
        all.push(datum);
      }

      // draw wires
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.lineWidth = opts.wireframeWidth;
      ctx.strokeStyle = opts.wireframeColor;

      // step everything
      all.forEach((item) => item.step());
      ctx.stroke();

      // draw everything
      ctx.globalCompositeOperation = "source-over";
      all.sort((a, b) => b.screen.z - a.screen.z);
      all.forEach((item) => item.draw());
    }

    // --------------------------------------------------------------------------------
    // 5) Initial Screen + start
    // --------------------------------------------------------------------------------
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ccc";
    ctx.font = "50px Verdana";
    // const txt = "Calculating Nodes";
    // ctx.fillText(txt, w / 2 - ctx.measureText(txt).width / 2, h / 2 - 15);

    // small timeout to show “Calculating Nodes” for a frame
    setTimeout(init, 50);

    // Handle window resize
    const handleResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      opts.vanishPoint.x = w / 2;
      opts.vanishPoint.y = h / 2;
      ctx.fillRect(0, 0, w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // end useEffect

  return <canvas ref={canvasRef} className="swirly-canvas" />;
}

export default SwirlyLoading;
