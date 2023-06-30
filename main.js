import './style.css'
import App from './src/App'
import Loader from './src/gltf/Loader'
import Panel from './src/gui/Panel'

// 3D scene initialization 创建场景
const app = new App()


// GLTFLoader
const modelPath = 'src/gltf/medieval_fantasy_book/scene.gltf'
const loader = new Loader(app, modelPath)


