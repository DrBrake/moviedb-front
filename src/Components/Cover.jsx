import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import dayjs from "dayjs";
import { withStyles } from "@material-ui/core/styles";
import { getAppWidth } from "../utils";
import { ROUTES } from "../constants";
import InfoChip from "./InfoChip";

const styles = () => ({
  relative: {
    position: "relative",
  },
});

class Cover extends Component {
  constructor(props) {
    super(props);

    this.renderer = null;
    this.geometry = null;
    this.materials = [];
    this.spineTexture = null;
    this.frontTexture = null;
    this.backTexture = null;
    this.cube = null;
    this.scene = null;
    this.moveTween = null;
    this.rotateTween = null;
    this.controls = null;

    this.mouseDown = false;
    this.mouseY = 0;
    this.deltaY = 0;
    this.mouseYOnMouseDown = 0;
    this.targetRotationOnMouseDownY = 0;

    this.animate = () => {};
    this.animationId = null;
  }

  componentDidMount() {
    const { movie, coverRect } = this.props;
    window.addEventListener("beforeunload", this.componentCleanup);
    this.scene = new THREE.Scene();
    const appWidth = getAppWidth();
    let camera = new THREE.PerspectiveCamera(
      75,
      appWidth / window.innerHeight,
      0.1,
      2000
    );
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    this.renderer.setSize(appWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    this.geometry = new THREE.BoxBufferGeometry(400, 568, 41);

    this.spineTexture = new THREE.TextureLoader().load(
      `http://localhost:8080/images/movie/${movie?.MovieName}.jpg?spine=true`
    );
    this.frontTexture = new THREE.TextureLoader().load(
      `http://localhost:8080/images/movie/${movie?.MovieName}.jpg?front=true`
    );
    this.backTexture = new THREE.TextureLoader().load(
      `http://localhost:8080/images/movie/${movie?.MovieName}.jpg?back=true`
    );

    this.materials = [
      new THREE.MeshBasicMaterial({
        color: 0x3b393a,
      }),
      new THREE.MeshBasicMaterial({
        map: this.spineTexture,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x3b393a,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x3b393a,
      }),
      new THREE.MeshBasicMaterial({
        map: this.frontTexture,
      }),
      new THREE.MeshBasicMaterial({
        map: this.backTexture,
      }),
    ];

    this.cube = new THREE.Mesh(this.geometry, this.materials);
    const vector = new THREE.Vector3(
      coverRect.x * appWidth,
      coverRect.y * window.innerHeight,
      -1400
    );
    this.cube.position.set(vector.x / 1.23, vector.y / 1.23, vector.z);
    this.cube.rotateY(1.6);
    this.cube.rotateY(
      Math.atan2(
        camera.position.x - this.cube.position.x,
        camera.position.z - this.cube.position.z
      )
    );
    this.cube.rotateZ(
      Math.atan2(
        camera.position.y + this.cube.position.y,
        camera.position.z - this.cube.position.z
      )
    );

    const isStartXNegative = this.cube.position.x < 17;
    const isStartYNegative = this.cube.position.y < 0;

    const getRotationOptions = () => {
      if (isStartXNegative) return { y: 2.4, z: isStartYNegative ? 3.5 : -2.7 };
      else return { y: 0.8, z: 0.2 };
    };

    this.rotateTween = new TWEEN.Tween(this.cube.rotation)
      .to(getRotationOptions(), 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        this.controls = new OrbitControls(camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.target.set(
          this.cube.position.x,
          this.cube.position.y,
          this.cube.position.z
        );
        this.addMouseHandler(this.renderer.domElement);
      });

    this.moveTween = new TWEEN.Tween(this.cube.position)
      .to({ x: 0, y: 0, z: -600 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {
        this.rotateTween.start();
      });

    this.scene.add(this.cube);
    this.moveTween.start();
    this.animate = () => {
      this.animationId = requestAnimationFrame(this.animate);

      TWEEN.update();
      if (this.controls) this.controls.update();

      this.renderer.render(this.scene, camera);
    };
    this.animate();
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  componentCleanup() {
    cancelAnimationFrame(this.animationId);
    if (this.spineTexture && this.spineTexture.dispose) {
      this.spineTexture.dispose();
    }
    if (this.frontTexture && this.frontTexture.dispose) {
      this.frontTexture.dispose();
    }
    if (this.backTexture && this.backTexture.dispose) {
      this.backTexture.dispose();
    }
    if (this.materials) {
      for (let i = 0; i < this.materials.length; i++) {
        if (this.materials[i].dispose) {
          this.materials[i].dispose();
        }
      }
    }
    if (this.geometry && this.geometry.dispose) {
      this.geometry.dispose();
    }
    if (this.controls && this.controls.dispose) {
      this.controls.dispose();
    }
    if (this.renderer && this.renderer.dispose) {
      this.renderer.dispose();
    }
    if (this.scene && this.scene.remove && this.cube) {
      this.scene.remove(this.cube);
    }
  }

  onMouseDown(e) {
    e.preventDefault();
    this.animate();
  }

  onMouseUp(e) {
    e.preventDefault();
    cancelAnimationFrame(this.animationId);
  }

  addMouseHandler(canvas) {
    canvas.addEventListener(
      "mousedown",
      (e) => {
        this.onMouseDown(e);
      },
      false
    );
    canvas.addEventListener(
      "mouseup",
      (e) => {
        this.onMouseUp(e);
      },
      false
    );
  }

  render() {
    const { classes, movie, history } = this.props;
    return (
      <div className={classes.relative}>
        <div ref={(ref) => (this.mount = ref)} />
        <InfoChip
          label={`${movie?.MovieName}
          Year: ${movie?.MovieYear}
          Plays: ${movie?.MoviePlays}
          Date added: ${dayjs(movie?.MovieAdded).format("DD.MM.YYYY")}`}
          coverView
          onClick={() => history.push(`${ROUTES.MOVIE}/${movie.MovieID}`)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Cover);
