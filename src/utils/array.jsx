export default function addValueToObject(arrayObjects, objectRow) {
    return arrayObjects.map(obj => ({
        ...obj,
        ...objectRow
    }));
}
