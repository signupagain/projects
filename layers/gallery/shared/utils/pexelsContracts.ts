import { oc } from '@orpc/contract'
import * as z from 'zod'

/**
 * The Pexels API will only return a 200 status code. Other errors will not be returned, including 429 Too Many Requests, which indicates that the usage limit has been exceeded. Therefore, the only error will be TIMEOUT.
 * Reference: https://www.pexels.com/api/documentation/?language=javascript#statistics
 */

/* get photo */
const getPhotoInput = oc.input(PhotoRequestSchema)

const getPhotoServer = getPhotoInput.output(PhotoResponseSchema)

const getPhotoClient = getPhotoInput.output(PhotoResponseSchema)

/* curated photos */
const curatedPhotosInput = oc.input(CuratedRequestSchema)

const curatedPhotosServer = curatedPhotosInput.output(CuratedResponseSchema)

const curatedPhotosClient = curatedPhotosInput.output(
	z.object({
		...CuratedResponseSchema.shape,
		photos: z.array(PhotoResponseSchema),
	}),
)

/* search photos */
const searchPhotosInput = oc.input(SearchRequestSchema)

const searchPhotosServer = searchPhotosInput.output(SearchResponseSchema)

const searchPhotosClient = searchPhotosInput.output(
	z.object({
		...SearchResponseSchema.shape,
		photos: z.array(PhotoResponseSchema),
	}),
)

export const pexelsContracts = {
	server: {
		getPhoto: getPhotoServer,
		curatedPhotos: curatedPhotosServer,
		searchPhotos: searchPhotosServer,
	},
	client: {
		getPhoto: getPhotoClient,
		curatedPhotos: curatedPhotosClient,
		searchPhotos: searchPhotosClient,
	},
}
