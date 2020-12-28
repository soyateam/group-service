import mongoose from 'mongoose';
import { IGroup } from '../group/group.interface';


export default class DateDumpModel {

    static getAllDates(collectionName: string) {
        const regexCollectionName = new RegExp(`${collectionName}_([0-9]{4}\-[0-9]{2})`);
        const collections = Object.keys(mongoose.connection.collections);
        const dates = [];

        for (let collection of collections) {
            let regexMatches = collection.match(regexCollectionName);
            
            if (regexMatches) {
                dates.push(regexMatches[1]);
            }
        }

        return dates;
    }

    static getModelByDate(originalModel: mongoose.Model<IGroup & mongoose.Document>, date: string) {
        return mongoose.model<IGroup & mongoose.Document>(
            `${originalModel.collection.collectionName}_${date}`,
            originalModel.schema
        );
    }

}