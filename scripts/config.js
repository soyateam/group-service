const faker = require('faker');

/* Amounts of mock data for each schema */

// NOTE: IMPORTANT! (organizationGroupAmount - 1) MUST be dividiable by (treeDepth - 1)
//       AND (organizationGroupAmount - 1) must be dividable by (personsAmount - 1)
const treeDepth = 6;
const organizationGroupsAmount = 41;
const personsAmount = 401;

// Reference types for genericMock creation
const refTypes = {
    refOrganizationGroupChildrenId: 'refOrganizationGroupChildrenId',
    refOrganizationGroupAncestorsId: 'refOrganizationGroupAncestorsId',        
    refOrganizationGroupAncestorsName: 'refOrganizationGroupAncestorsName',
    refOrganizationGroupPersonMembers: 'refOrganizationGroupPersonMembers',

    refPersonHierarchyAncestors: 'refPersonHierarchyAncestors',
    refPersonDirectGroup: 'refPersonDirectGroup',
};

// Organization Group schema for creating organization groups mocks
const organizationGroupSchema = {
    name: faker.commerce.department,
    akaUnit: faker.commerc.productMaterial,
    id: faker.random.uuid,
    isAlive: faker.random.boolean,
    isALeaf: faker.random.boolean,
    children: refTypes.refOrganizationGroupChildrenId,
    ancestors: refTypes.refOrganizationGroupAncestorsId,        
    hierarchy: refTypes.refrefOrganizationGroupAncestorsName,
    directMembers: refTypes.refOrganizationGroupPersonMembers,
};

/* Person field types */

const personEntityTypes = {
    a: 'a',
    b: 'b',
    c: 'c',
};

const personStatusTypes = {
    active: 'active',
    inactive: 'inactive',
};

const personServiceTypes = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
};

const personRankTypes = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j'
};

const personClearanceTypes = {
    1: 1,
    2: 2,
    3: 3, 
    4: 4,
    5: 5,
    6: 6, 
    7: 7,
    8: 8,
    9: 9,
    10: 10,
};

const firstDischargeDate = '2018-01-01';
const lastDischargeDate = '2026-01-01';

// Person schema for creating person mocks
const personSchema = {
    id: faker.random.uuid,
    identityCard: faker.random.number,
    personalNumber: faker.random.number,
    domainUsers: () => {
        const domains = [];
        for (let index = 0; index <= (Math.floor(Math.random() * 3)); index ++) {
            domains.push(faker.internet.domainName);
        }
        return domains;
    },
    entityType: () => personEntityTypes[Object.keys(personEntityTypes)[Math.floor(Math.random() * (Object.keys(personEntityTypes).length - 1))]],
    serviceType: () => personServiceTypes[Object.keys(personServiceTypes)[Math.floor(Math.random() * (Object.keys(personServiceTypes).length - 1))]],
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    currentUnit: faker.commerce.productMaterial,
    status: () => personStatusTypes[Object.keys(personStatusTypes)[Math.floor(Math.random() * (Object.keys(personStatusTypes).length - 1))]],
    dischargeDay: faker.date.between.bind({}, firstDischargeDate, lastDischargeDate),
    hierarchy: refPersonHierarchyAncestors,
    directGroup: refPersonDirectGroup,
    rank: () => personRankTypes[Object.keys(personRankTypes)[Math.floor(Math.random() * (Object.keys(personRankTypes).length - 1))]],
    updatedAt: faker.date.recent,
    createdAt: faker.date.past,
    job: faker.name.jobTitle,
    mail: faker.internet.email,
    phone: faker.phone.phoneNumber,
    mobilePhone: faker.phone.phoneNumber,
    address: faker.address.streetAddress,
    clearance: () => personClearanceTypes[Object.keys(personClearanceTypes)[Math.floor(Math.random() * (Object.keys(personClearanceTypes).legnth - 1))]],
};

module.exports = {
    treeDepth,
    organizationGroupsAmount,
    personsAmount,

    refTypes,
    organizationGroupSchema,

    personEntityTypes,
    personStatusTypes,
    personServiceTypes,
    personRankTypes,
    personClearanceTypes,

    firstDischargeDate,
    lastDischargeDate,   

    personSchema
}