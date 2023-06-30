import { GUI } from 'dat.gui';
import App from '@/App';


export default class Panel {

  #loader = undefined
  #scene = undefined
  #camera = undefined
  #control = undefined
  #renderer = undefined
  #app = undefined
  #model = undefined
  #gui = new GUI()

  #axesHelper = undefined
  #gridHelper = undefined
  #cameraHelper = undefined
  #box3Helper = undefined

  // showInfo = () => {
  //   console.log("loader: ", this.#loader);
  //   console.log("scene: ", this.#scene);
  //   console.log("camera: ", this.#camera);
  //   console.log("control: ", this.#control);
  //   console.log("renderer: ", this.#renderer);
  //   console.log("app: ", this.#app);
  //   console.log("model: ", this.#model);
  // }

  #PanelAdd = () => {
    const cameraFolder = this.#gui.addFolder('CAMERA')
    cameraFolder.open()
    const cameraPositionX = cameraFolder.add(this.#camera.position, 'x').name('camera.position.x').listen()
    const cameraPositionY = cameraFolder.add(this.#camera.position, 'y').name('camera.position.y').listen()
    const cameraPositionZ = cameraFolder.add(this.#camera.position, 'z').name('camera.position.z').listen()

    const controlFolder = this.#gui.addFolder('CONTROL')
    controlFolder.open()
    this.controlAutoRotateHandler = controlFolder.add(this.#controlBtn, 'autoRotate').listen()// 旋转
    this.#updateAutoRotateState()

    controlFolder.add(this.#control, 'autoRotateSpeed', -10, 10, 0.1).name('Auto Rotate Speed').listen()// 旋转速度

    const controlResetAll = controlFolder.add(this.#controlBtn, 'resetPosition').name('Reset All')// 所有设置还原

    controlFolder.addColor(this.#app, 'backgroundColor').name('Background Color').listen()
  }

  #controlBtn = {
    autoRotate: () => {
      this.#control.autoRotate = !this.#control.autoRotate
      this.#updateAutoRotateState()
    },

    resetPosition: () => {
      this.#control.reset()
      this.#app.setting()
      this.#updateAutoRotateState()
    }
  }

  #updateAutoRotateState = () => {
    this.controlAutoRotateHandler.name("Auto Rotate: " + this.#control.autoRotate)
  }

  constructor(app = new App(), loader) {
    this.#app = app
    this.#loader = loader
    this.#scene = app.scene
    this.#camera = app.camera
    this.#control = app.control
    this.#renderer = app.renderer
    this.#model = loader.model
    // this.showInfo()
    this.#PanelAdd()
  }
}