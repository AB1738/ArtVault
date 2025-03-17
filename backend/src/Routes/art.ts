import express from 'express'
import { addArtwork,deleteArtwork } from '../Controllers/art';

const router = express.Router();


router.post('/:artId',addArtwork)

router.delete('/:artId',deleteArtwork)

export default router