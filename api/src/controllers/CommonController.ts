import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { platformConfig } from '../../config/platformConfig'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import AirlakeHistoryModel from '../models/AirlakeHistoryModel'
import EvolakeQueryModel from '../models/EvolakeQueryModel'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'
import SnowlakePrototypeModel from '../models/SnowlakePrototypeModel'
import SubscriptionModel from '../models/SubscriptionModel'

export default class CommonController {
    async getPlatformConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(platformConfig)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getSubscriptionConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(subscriptionConfig)
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getUsageByApiKey(req: Request, res: Response) {
        try {
            const userId = req.headers.id
            const subscription = await SubscriptionModel.findOne({ owner: userId })

            if (subscription) {
                const { apiKey } = subscription
                const airlakeApiRequestCount = await AirlakeHistoryModel.find({ apiKey }).countDocuments()
                const evolakeQueryCount = await EvolakeQueryModel.find({ apiKey }).countDocuments()
                const icelakeDocumentCount = await IcelakeDocumentModel.find({ apiKey }).countDocuments()
                const snowlakePrototypeCount = await SnowlakePrototypeModel.find({ apiKey }).countDocuments()
                const frostlakeAnalyticsCount = 0
                return res.status(200).json({ airlakeApiRequestCount, evolakeQueryCount, icelakeDocumentCount, snowlakePrototypeCount, frostlakeAnalyticsCount })
            }

            else {
                return res.status(200).json({ msg: 'No Active Subscription Found' })
            }
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError, error })
        }
    }
}