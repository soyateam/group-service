const faker = require('faker');
const fs = require('fs');
const config = require('./config');

// Reversed References fields in organization groups.
// Key is the reference type value, and value is the field in the organization group object
// contains that reference type.
const organizationGroupsReverseRefFields =
    Object.keys(config.organizationGroupSchema)
        .filter(prop => typeof config.organizationGroupSchema[prop] === 'string')
        .reduce((obj, item) => {
            return {
                ...obj,
                [config.organizationGroupSchema[item]]: item,
            };
        }, {});

// Reversed References fields in persons.
// Key is the reference type value, and value is the field in the person object
// contains that reference type.
const personsReverseRefFields =
    Object.keys(config.personSchema)
        .filter(prop => typeof config.personSchema[prop] === 'string')
        .reduce((obj, prop) => {
            return {
                ...obj,
                [config.personSchema[prop]]: prop
            };
        }, {});

/**
 * Generate a mock by given schema.
 * @param {Object} schema - Schema to generate mock from
 */
const generateMockData = (schema) => {

    // Set empty mock object and get all schema properties
    const mock = {};
    const schemaProps = Object.keys(schema);

    // For each property generate fake data
    for (let prop of schemaProps) {

        // Each prop in the schema is containing function to generate the appropriate type 
        // (unless the prop is in type of string - which indicates reference)
        if (typeof schema[prop] === 'function') {
            mock[prop] = schema[prop]();
        }
    }

    return mock;
};

/**
 * Generate amount of mocks by schema.
 * @param {Object} schema - Schema to generate mock from.
 * @param {Number} amount - Numbers indicates mocks amount.
 */
const generateAmountOfMocks = (schema, amount) => {

    // Create empty mocks array
    const mocks = [];

    // Create each mock and add it to the array
    for (let index = 1; index <= amount; index += 1) {
        mocks.push(generateMockData(schema));
    }

    return mocks;
};

/**
 * Attach organization group to given parent organization group.
 * @param {Object} parentGroup - Organization group mock object which represent the parent of the group.
 * @param {Object} group - Organization group mock object which represent the child of the parent group.
 */
const attachGroupToParent = (parentGroup, group) => {

    // Set ancestors to previous ancestors the parent organization group has, and add parent as ancestor.
    // NOTE: The order of ancestors goes like this - the first ancestor is the closest ancestor (the parent) and so on.
    group[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId] =
        [parentGroup.id, ...parentGroup[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId]];

    // Set hierarchy as the parent hierarchy and add the current parnet as part of the hierarchy.
    // NOTE: The order of hierarchy goes like this - the first hierarchy will be the root parent in the tree and so on.
    group[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName] =
        [...parentGroup[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName], `${parentGroup.name}/`];

    // Set group children
    group[organizationGroupsReverseRefFields.refOrganizationGroupChildrenId] = [];

    // Set root organization group children
    parentGroup[organizationGroupsReverseRefFields.refOrganizationGroupChildrenId].push(group.id);
}

/**
 * Add multiple persons to given organization group.
 * @param {Object} group - Organization group mock object.
 * @param {[Object]} persons - Full array of person mock objects.
 * @param {Number} startingIndex - Index in the array to start add persons from.
 * @param {Number} numOfPersons - Amount of persons to add from the persons array.
 */
const addPersonsToOrganizationGroup = (group, persons, startingIndex, numOfPersons) => {

    for (let personIndex = startingIndex; personIndex < startingIndex + numOfPersons; personIndex += 1) {

        // Set person direct group
        persons[personIndex][personsReverseRefFields.refPersonDirectGroup] = group.id;

        // Set person hierarchy (the same as the group has)
        persons[personIndex][personsReverseRefFields.refPersonHierarchyAncestors] =
            group[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName];

        // Add the person to the direct members of the group
        group[organizationGroupsReverseRefFields.refOrganizationGroupPersonMembers].push(persons[personIndex]);
    }
};

/**
 * Generates whole data object mock with relations between entities
 */
const generateMockData = () => {

    // First create all mocks for each schema
    const organizationGroupsMocks = generateAmountOfMocks(config.organizationGroupSchema, config.organizationGroupsAmount);
    const personsMocks = generateAmountOfMocks(config.personSchema, config.personsAmount);

    // Create array to store organization groups tiers in the tree
    const organizationGroupsTiers = [];

    // Calculate number of organization groups for each tier
    // minus first root organization which will be in the top tier, and minus top tier which will
    // contain the first root organization.
    const numOrganizationGroupsEachTier = ((config.organizationGroupsAmount - 1) / (config.treeDepth - 1));

    // Calculate number of persons for each organization group.
    // Root organization group will have only one person, so we need to avoid first group and first
    // person in calculation.
    const numPersonsEachGroup = ((config.organizationGroupsAmount - 1) / (config.personsAmount - 1));

    // Set starting index for person mocks array to know from where we need to add persons at current time.    
    const startingIndexPersons = 0;

    // Set root organization group ancestors
    organizationGroupsMocks[0][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId] = [];

    // Set root organization group hierarchy
    organizationGroupsMocks[0][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName] = [];

    // Set root organization group children groups
    organizationGroupsMocks[0][organizationGroupsReverseRefFields.refOrganizationGroupChildrenId] = [];

    // Set root organization group direct members
    organizationGroupsMocks[0][organizationGroupsReverseRefFields.refOrganizationGroupPersonMembers] = [];

    // Attaching one person to root organization group
    addPersonsToOrganizationGroup(organizationGroupsMocks[0], personsMocks, 0, 1);
    startingIndexPersons += 1;

    // First tier must be the root organization group
    organizationGroupsTiers.push([organizationGroupsMocks[0]]);

    // Prepare next group tier
    organizationGroupsTiers.push([]);

    // Next tier must be children of root organization group
    for (let groupIndex = 1; groupIndex < numOrganizationGroupsEachTier; groupIndex += 1) {

        // // Setting each organization group ancestors as the root organization group id
        // organizationGroupsMocks[groupIndex][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId] =
        //     [organizationGroupsTiers[0][0].id];

        // // Setting each organization group hierarchy as the root organization name
        // organizationGroupsMocks[groupIndex][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName] =
        //     [organizationGroupsTiers[0][0].name];

        // // Setting each organization group children 
        // organizationGroupsMocks[groupIndex][organizationGroupsReverseRefFields.refOrganizationGroupChildrenId] = [];

        // Setting each organization group direct members
        organizationGroupsMocks[groupIndex][organizationGroupsReverseRefFields.refOrganizationGroupPersonMembers] = [];

        // Adding persons to each organization group and update starting index for next group
        addPersonsToOrganizationGroup(organizationGroupsMocks[groupIndex], personsMocks, startingIndexPersons, numPersonsEachGroup);
        startingIndexPersons += numPersonsEachGroup + 1;

        // Attach each organization group to root organization group
        attachGroupToParent(organizationGroupsTiers[0][0], organizationGroupsMocks[groupIndex]);

        // // Setting root organization group children
        // organizationGroupsTiers[0][0][organizationGroupsReverseRefFields.refOrganizationGroupChildrenId]
        //     .push(organizationGroupsMocks[groupIndex].id);

        // After setting all reference fields in organization group, need to add it to the tier
        organizationGroupsTiers[1].push(organizationGroupsMocks[groupIndex]);
    }

    // For each tier, add organization groups, starting from the top to the bottom tier
    for (let tierIndex = 2; tierIndex <= config.treeDepth - 1; tierIndex += 1) {

        // Create new organization groups tier
        organizationGroupsTiers.push([]);

        // Choose organization groups for each tier.
        // Example indicating how the split for each group occures:
        // We have 41 groups and 6 tiers.
        // (Remember first tier has one group, and therfore whe have 40 groups and 5 tiers.
        //  After setting the second tier, we reach here, so we start from third tier)
        // orgIndex runs in the following values [9, ..., 16], [17, ..., 24], [25, ..., 32], [33, ..., 40].
        // means we take 8 groups for each tier.        
        for (let orgIndex = (tierIndex - 1) * numOrganizationGroupsEachTier + 1;
            orgIndex <= (tierIndex - 1) * numOrganizationGroupsEachTier + numOrganizationGroupsEachTier;
            orgIndex += 1) {

            // All possible parents for current tier organization group
            const possibleParents = organizationGroupsTiers[tierIndex - 1];

            // Get randomized parent
            const randomParent = possibleParents[Math.floor(Math.random() * (possibleParents.length - 1))];

            // Set group direct members
            organizationGroupsMocks[orgIndex][organizationGroupsReverseRefFields.refOrganizationGroupPersonMembers] = [];

            // Add persons to group and update starting index for next group
            addPersonsToOrganizationGroup(organizationGroupsMocks[orgIndex], personsMocks, startingIndexPersons, numPersonsEachGroup);
            startingIndexPersons += numPersonsEachGroup + 1;

            // Attach group to parent group
            attachGroupToParent(randomParent, organizationGroupsMocks[orgIndex]);

            // // Set ancestors to previous ancestors the parent organization group has, and add parent as ancestor.
            // // NOTE: The order of ancestors is backwards - means the first ancestor is the first tier organization group and so on.
            // organizationGroupsMocks[orgIndex][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId] =
            //     [...randomParent[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsId], randomParent.id];

            // // Set hierarchy as the parent hierarchy and add the current parnet as part of the hierarchy.
            // // NOTE: The order of hierarchy is RTL - means the first hierarchy will be the current parent name.
            // organizationGroupsMocks[orgIndex][organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName] =
            //     [`${randomParent.name}/`, ...randomParent[organizationGroupsReverseRefFields.refOrganizationGroupAncestorsName]];

            // // Set group children
            // organizationGroupsMocks[orgIndex][organizationGroupsReverseRefFields.refOrganizationGroupChildrenId] = [];

            // // Set group direct members
            // organizationGroupsMocks[orgIndex][organizationGroupsReverseRefFields.refOrganizationGroupPersonMembers] = [];

            // // Add persons to group and update starting index for next group
            // addPersonsToOrganizationGroup(organizationGroupsMocks[orgIndex], personsMocks, startingIndexPersons, numPersonsEachGroup);
            // startingIndexPersons += numPersonsEachGroup + 1;


            // // Setting root organization group children
            // randomParent[organizationGroupsReverseRefFields.refOrganizationGroupChildrenId]
            //     .push(organizationGroupsMocks[orgIndex].id);

            // After setting all reference fields in organization group, need to add it to the tier
            organizationGroupsTiers[tierIndex].push(organizationGroupsMocks[orgIndex]);
        }
    }    

    return [organizationGroupsTiers, personsMocks];
}


