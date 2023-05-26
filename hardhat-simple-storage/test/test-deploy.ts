import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
  let SimpleStorageFactory: SimpleStorage__factory,
    simpleStorage: SimpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    simpleStorage = await SimpleStorageFactory.deploy();
  });
  it("Should start with a number of 0 ", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should update when we call store", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("should add a person with the given name and favorite number", async () => {
    const name = "John";
    const favoriteNumber = 42;

    await simpleStorage.addPerson(name, favoriteNumber);

    // Retrieve the added person
    const addedPerson = await simpleStorage.people(0);

    // Assert the person's details
    assert.equal(addedPerson.name, name, "The person's name should match");
    assert.equal(
      addedPerson.favoriteNumber,
      favoriteNumber,
      "The person's favorite number should match"
    );

    // Retrieve the favorite number by name
    const retrievedFavoriteNumber = await simpleStorage.nameToFavoriteNumber(
      name
    );

    // Assert the retrieved favorite number
    assert.equal(
      retrievedFavoriteNumber,
      favoriteNumber,
      "The retrieved favorite number should match"
    );
  });
});
