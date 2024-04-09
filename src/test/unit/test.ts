import {describe,it,expect,jest} from "@jest/globals"

import {User} from "../../user/domain/entity/user";
import {Credentials} from "../../user/domain/entity/credentials";
import {MysqlUserRepository} from "../../user/infrastructure/repository/mysqlUserRepository";
import {EncryptService} from "../../user/domain/service/encryptService";
import {MysqlBusStopRepository} from "../../busStop/infrastructure/repository/mysqlBusStopRepository";
import {Decimal128} from "mongodb";
import {BusStop} from "../../busStop/domain/entity/busStop";
import { MysqlBusRouteRepository } from "busRoute/infrastructure/repository/mysqlBusRouteRepository";
import {BusRoute} from "../../busRoute/domain/entity/busRoute";
import { MysqlPathRepository } from "path/infrastructure/repository/mysqlPathRepository";
import * as Path from "path";

describe('MysqlUserRepository', () => {

    // can generate a valid uuid for a given name
    it('should generate a valid uuid for a given name', async () => {
        const userRepository = new MysqlUserRepository();
        const name = 'John Doe';
        const uuid = await userRepository.generateUuid(name);
        expect(uuid).toMatch(/^[a-z]{3}[0-9]{3}$/);
    });

    // can sign up a new user with unique email
    it('should sign up a new user with unique email', async () => {
        const userRepository = new MysqlUserRepository();
        const uuid = '123456';
        const name = 'John';
        const lastname = 'Doe';
        const email = 'john.doe@example.com';
        const password = 'password';
        const role = 'user';
        const credentials = new Credentials(email, password);
        const user = await userRepository.signUp(uuid, name, lastname, credentials, role);
        expect(user).toEqual(new User(uuid, name, lastname, credentials, role, null));
    });

    // can find a user by their email
    it('should find a user by their email', async () => {
        const userRepository = new MysqlUserRepository();
        const email = 'john.doe@example.com';
        const user = await userRepository.findByEmail(email);
        expect(user).toEqual(new User('123456', 'John', 'Doe', new Credentials(email, 'password'), 'user', null));
    });

    // can find a user by their uuid
    it('should find a user by their uuid', async () => {
        const userRepository = new MysqlUserRepository();
        const uuid = '123456';
        const user = await userRepository.findById(uuid);
        expect(user).toEqual(new User(uuid, 'John', 'Doe', new Credentials('john.doe@example.com', 'password'), 'user', null));
    });

    // can log in a user with valid credentials
    it('should log in a user with valid credentials', async () => {
        const userRepository = new MysqlUserRepository();
        const credentials = new Credentials('john.doe@example.com', 'password');
        // @ts-ignore
        const encryptService = new EncryptService();
        const user = await userRepository.login(credentials, encryptService);
        expect(user).toEqual(new User('123456', 'John', 'Doe', credentials, 'user', null));
    });

    // can update a user's information
    it('should update a users information', async () => {
    const userRepository = new MysqlUserRepository();
    const uuid = '123456';
    const user = new User(uuid, 'John', 'Doe', new Credentials('john.doe@example.com', 'password'), 'user', null);
    const updatedUser = await userRepository.update(uuid, user);
    expect(updatedUser).toEqual(user);
});

// returns null when trying to generate uuid for an existing user
it('should return null when trying to generate uuid for an existing user', async () => {
    const userRepository = new MysqlUserRepository();
    const name = 'John Doe';
    const uuid = await userRepository.generateUuid(name);
    expect(uuid).toBeNull();
});

// returns null when trying to sign up a user with an existing email
it('should return null when trying to sign up a user with an existing email', async () => {
    const userRepository = new MysqlUserRepository();
    const uuid = '123456';
    const name = 'John';
    const lastname = 'Doe';
    const email = 'john.doe@example.com';
    const password = 'password';
    const role = 'user';
    const credentials = new Credentials(email, password);
    const user = await userRepository.signUp(uuid, name, lastname, credentials, role);
    expect(user).toBeNull();
});

// returns null when trying to find a non-existing user by email
it('should return null when trying to find a non-existing user by email', async () => {
    const userRepository = new MysqlUserRepository();
    const email = 'nonexisting@example.com';
    const user = await userRepository.findByEmail(email);
    expect(user).toBeNull();
});

// returns null when trying to find a non-existing user by uuid
it('should return null when trying to find a non-existing user by uuid', async () => {
    const userRepository = new MysqlUserRepository();
    const uuid = 'nonexisting';
    const user = await userRepository.findById(uuid);
    expect(user).toBeNull();
});

// returns null when trying to log in with invalid credentials
it('should return null when trying to log in with invalid credentials', async () => {
    const userRepository = new MysqlUserRepository();
    const credentials = new Credentials('john.doe@example.com', 'wrongpassword');
    // @ts-ignore
    const encryptService = new EncryptService();
    const user = await userRepository.login(credentials, encryptService);
    expect(user).toBeNull();
});

// returns null when trying to update a non-existing user
it('should return null when trying to update a non-existing user', async () => {
    const userRepository = new MysqlUserRepository();
    const uuid = 'nonexisting';
    const user = new User(uuid, 'John', 'Doe', new Credentials('john.doe@example.com', 'password'), 'user', null);
    const updatedUser = await userRepository.update(uuid, user);
    expect(updatedUser).toBeNull();
});

});


describe('MysqlBusStopRepository', () => {

    // create a new bus stop successfully
    it('should create a new bus stop successfully when valid parameters are provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';
        const name = 'valid-name';
        const latitude = new Decimal128(0);
        const longitude = new Decimal128(0);

        // Act
        const result = await repository.create(uuid, name, latitude, longitude);

        // Assert
        expect(result).toBeInstanceOf(BusStop);
        expect(result.uuid).toBe(uuid);
        expect(result.name).toBe(name);
        expect(result.latitude).toBe(latitude);
        expect(result.longitude).toBe(longitude);
        expect(result.deletedAt).toBeNull();
    });

    // get a bus stop by uuid successfully
    it('should get a bus stop by uuid successfully when a valid uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';

        // Act
        const result = await repository.getByUuid(uuid);

        // Assert
        expect(result).toBeInstanceOf(BusStop);
        expect(result.uuid).toBe(uuid);
    });

    // get all bus stops successfully
    it('should get all bus stops successfully', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();

        // Act
        const result = await repository.getAll();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((busStop: BusStop) => {
            expect(busStop).toBeInstanceOf(BusStop);
        });
    });

    // update a bus stop successfully
    it('should update a bus stop successfully when a valid uuid and bus stop object are provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';
        const updatedBusStop = new BusStop(uuid, 'updated-name', new Decimal128(1), new Decimal128(1), null);

        // Act
        const result = await repository.update(uuid, updatedBusStop);

        // Assert
        expect(result).toBeInstanceOf(BusStop);
        expect(result.uuid).toBe(uuid);
        expect(result.name).toBe(updatedBusStop.name);
        expect(result.latitude).toBe(updatedBusStop.latitude);
        expect(result.longitude).toBe(updatedBusStop.longitude);
    });

    // delete a bus stop successfully
    it('should delete a bus stop successfully when a valid uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';

        // Act
        await repository.deleteByUuid(uuid);

        // Assert
        const result = await repository.getByUuid(uuid);
        expect(result).toBeNull();
    });

    // create a bus stop with invalid uuid
    it('should not create a bus stop when an invalid uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'invalid-uuid';
        const name = 'valid-name';
        const latitude = new Decimal128(0);
        const longitude = new Decimal128(0);

        // Act
        const result = await repository.create(uuid, name, latitude, longitude);

        // Assert
        expect(result).toBeNull();
    });

    // create a bus stop with invalid name
    it('should not create a bus stop when an invalid name is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';
        const name = '';
        const latitude = new Decimal128(0);
        const longitude = new Decimal128(0);

        // Act
        const result = await repository.create(uuid, name, latitude, longitude);

        // Assert
        expect(result).toBeNull();
    });

    // create a bus stop with invalid latitude
    it('should not create a bus stop when an invalid latitude is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';
        const name = 'valid-name';
        const latitude = null;
        const longitude = new Decimal128(0);

        // Act
        const result = await repository.create(uuid, name, latitude, longitude);

        // Assert
        expect(result).toBeNull();
    });

    // create a bus stop with invalid longitude
    it('should not create a bus stop when an invalid longitude is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'valid-uuid';
        const name = 'valid-name';
        const latitude = new Decimal128(0);
        const longitude = null;

        // Act
        const result = await repository.create(uuid, name, latitude, longitude);

        // Assert
        expect(result).toBeNull();
    });

    // get a non-existent bus stop
    it('should not get a bus stop when a non-existent uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'non-existent-uuid';

        // Act
        const result = await repository.getByUuid(uuid);

        // Assert
        expect(result).toBeNull();
    });

    // update a non-existent bus stop
    it('should not update a bus stop when a non-existent uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'non-existent-uuid';
        const updatedBusStop = new BusStop(uuid, 'updated-name', new Decimal128(1), new Decimal128(1), null);

        // Act
        const result = await repository.update(uuid, updatedBusStop);

        // Assert
        expect(result).toBeNull();
    });

    // delete a non-existent bus stop
    it('should not delete a bus stop when a non-existent uuid is provided', async () => {
        // Arrange
        const repository = new MysqlBusStopRepository();
        const uuid = 'non-existent-uuid';

        // Act
        await repository.deleteByUuid(uuid);

        // Assert
        const result = await repository.getByUuid(uuid);
        expect(result).toBeNull();
    });

});


describe('MysqlBusRouteRepository', () => {

    // can create a new bus route successfully
    it('should create a new bus route successfully when all parameters are valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const uuid = '123';
        const name = 'Test Route';
        const price = 10;
        const startTime = '09:00';
        const endTime = '10:00';
        const busStopId = '456';

        // Act
        const result = await repository.createBusRoute(uuid, name, price, startTime, endTime, busStopId);

        // Assert
        expect(result).toBeInstanceOf(BusRoute);
        expect(result.uuid).toBe(uuid);
        expect(result.name).toBe(name);
        expect(result.price).toBe(price);
        expect(result.startTime).toBe(startTime);
        expect(result.endTime).toBe(endTime);
        expect(result.busStopId).toBe(busStopId);
        expect(result.deletedAt).toBeNull();
    });

    // can delete an existing bus route successfully
    it('should delete an existing bus route successfully when UUID is valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const uuid = '123';

        // Act
        await repository.deleteBusRoute(uuid);

        // Assert
        // Check if the bus route is deleted by trying to get it by UUID and expecting null
        const result = await repository.getByUuid(uuid);
        expect(result).toBeNull();
    });

    // can get a bus route by its UUID successfully
    it('should get a bus route by its UUID successfully when UUID is valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const uuid = '123';

        // Act
        const result = await repository.getByUuid(uuid);

        // Assert
        expect(result).toBeInstanceOf(BusRoute);
        expect(result.uuid).toBe(uuid);
    });

    // can get a bus route by its name successfully
    it('should get a bus route by its name successfully when name is valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const name = 'Test Route';

        // Act
        const result = await repository.getByName(name);

        // Assert
        expect(result).toBeInstanceOf(BusRoute);
        expect(result.name).toBe(name);
    });

    // can get a list of bus routes by a given time successfully
    it('should get a list of bus routes by a given time successfully when time is valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const time = '09:30';

        // Act
        const result = await repository.getByTime(time);

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((busRoute: BusRoute) => {
            expect(busRoute.startTime).toBeLessThanOrEqual(time);
            expect(busRoute.endTime).toBeGreaterThanOrEqual(time);
        });
    });

    // can get a list of bus routes by a given bus stop UUID successfully
    it('should get a list of bus routes by a given bus stop UUID successfully when UUID is valid', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const busStopId = '456';

        // Act
        const result = await repository.getByBusStop(busStopId);

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((busRoute: BusRoute) => {
            expect(busRoute.busStopId).toBe(busStopId);
        });
    });

    // throws an error if trying to create a bus route with a non-existent bus stop UUID
    it('should throw an error when trying to create a bus route with a non-existent bus stop UUID', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const uuid = '123';
        const name = 'Test Route';
        const price = 10;
        const startTime = '09:00';
        const endTime = '10:00';
        const busStopId = 'non-existent';

        // Act & Assert
        await expect(repository.createBusRoute(uuid, name, price, startTime, endTime, busStopId)).rejects.toThrowError('Bus stop do not exist');
    });

    // returns null if trying to get a non-existent bus route by UUID
    it('should return null when trying to get a non-existent bus route by UUID', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const uuid = 'non-existent';

        // Act
        const result = await repository.getByUuid(uuid);

        // Assert
        expect(result).toBeNull();
    });

    // returns null if trying to get a non-existent bus route by name
    it('should return null when trying to get a non-existent bus route by name', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const name = 'non-existent';

        // Act
        const result = await repository.getByName(name);

        // Assert
        expect(result).toBeNull();
    });

    // returns null if trying to get a list of bus routes by a non-existent bus stop UUID
    it('should return null when trying to get a list of bus routes by a non-existent bus stop UUID', async () => {
        // Arrange
        const repository = new MysqlBusRouteRepository();
        const busStopId = 'non-existent';

        // Act
        const result = await repository.getByBusStop(busStopId);

        // Assert
        expect(result).toBeNull();
    });

});

describe('MysqlPathRepository', () => {

    // Create a path successfully
    it('should create a path successfully when valid parameters are provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const path = "/example/path";
        const busRouteId = "validBusRouteId";

        // Act
        const result = await repository.createPath(uuid, path, busRouteId);

        // Assert
        expect(result).toBeInstanceOf(Path);
        expect(result.uuid).toBe(uuid);
        expect(result.path).toBe(path);
        expect(result.busRouteId).toBe(busRouteId);
        expect(result.deletedAt).toBeNull();
    });

    // Get a path by id successfully
    it('should get a path by id successfully when a valid id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const path = "/example/path";
        const busRouteId = "validBusRouteId";
        await repository.createPath(uuid, path, busRouteId);

        // Act
        const result = await repository.getPathById(uuid);

        // Assert
        expect(result).toBeInstanceOf(Path);
        expect(result.uuid).toBe(uuid);
        expect(result.path).toBe(path);
        expect(result.busRouteId).toBe(busRouteId);
        expect(result.deletedAt).toBeNull();
    });

    // Get paths by bus successfully
    it('should get paths by bus successfully when a valid bus id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid1 = await repository.generateUuid();
        const path1 = "/example/path1";
        const busRouteId = "validBusRouteId";
        await repository.createPath(uuid1, path1, busRouteId);

        const uuid2 = await repository.generateUuid();
        const path2 = "/example/path2";
        await repository.createPath(uuid2, path2, busRouteId);

        // Act
        const result = await repository.getPathByBus(busRouteId);

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Path);
        expect(result[0].uuid).toBe(uuid1);
        expect(result[0].path).toBe(path1);
        expect(result[0].busRouteId).toBe(busRouteId);
        expect(result[0].deletedAt).toBeNull();
        expect(result[1]).toBeInstanceOf(Path);
        expect(result[1].uuid).toBe(uuid2);
        expect(result[1].path).toBe(path2);
        expect(result[1].busRouteId).toBe(busRouteId);
        expect(result[1].deletedAt).toBeNull();
    });

    // Update a path successfully
    it('should update a path successfully when a valid id and path object are provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const path = "/example/path";
        const busRouteId = "validBusRouteId";
        await repository.createPath(uuid, path, busRouteId);

        const updatedPath = new Path(uuid, "/updated/path", busRouteId, null);

        // Act
        const result = await repository.update(uuid, updatedPath);

        // Assert
        expect(result).toBeInstanceOf(Path);
        expect(result.uuid).toBe(uuid);
        expect(result.path).toBe(updatedPath.path);
        expect(result.busRouteId).toBe(updatedPath.busRouteId);
        expect(result.deletedAt).toBeNull();
    });

    // Delete a path successfully
    it('should delete a path successfully when a valid id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const path = "/example/path";
        const busRouteId = "validBusRouteId";
        await repository.createPath(uuid, path, busRouteId);

        // Act
        await repository.deleteById(uuid);
        const result = await repository.getPathById(uuid);

        // Assert
        expect(result).toBeNull();
    });

    // Create a path with invalid bus route id
    it('should not create a path when an invalid bus route id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const path = "/example/path";
        const invalidBusRouteId = "invalidBusRouteId";

        // Act
        const result = await repository.createPath(uuid, path, invalidBusRouteId);

        // Assert
        expect(result).toBeUndefined();
    });

    // Create a path with invalid path format
    it('should not create a path when an invalid path format is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuid = await repository.generateUuid();
        const invalidPath = "invalidPath";
        const busRouteId = "validBusRouteId";

        // Act
        const result = await repository.createPath(uuid, invalidPath, busRouteId);

        // Assert
        expect(result).toBeUndefined();
    });

    // Get a path by invalid id
    it('should not get a path when an invalid id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const invalidUuid = "invalidUuid";

        // Act
        const result = await repository.getPathById(invalidUuid);

        // Assert
        expect(result).toBeNull();
    });

    // Get paths by invalid bus id
    it('should not get paths when an invalid bus id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const invalidBusRouteId = "invalidBusRouteId";

        // Act
        const result = await repository.getPathByBus(invalidBusRouteId);

        // Assert
        expect(result).toBeNull();
    });

    // Update a path with invalid id
    it('should not update a path when an invalid id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const invalidUuid = "invalidUuid";
        const path = new Path(invalidUuid, "/example/path", "validBusRouteId", null);

        // Act
        const result = await repository.update(invalidUuid, path);

        // Assert
        expect(result).toBeNull();
    });

    // Delete a path with invalid id
    it('should not delete a path when an invalid id is provided', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const invalidUuid = "invalidUuid";

        // Act
        await repository.deleteById(invalidUuid);
        const result = await repository.getPathById(invalidUuid);

        // Assert
        expect(result).toBeNull();
    });

    // Generate unique uuid for path creation
    it('should generate a unique uuid for path creation', async () => {
        // Arrange
        const repository = new MysqlPathRepository();
        const uuids: string[] = [];

        // Act
        for (let i = 0; i < 100; i++) {
            const uuid = await repository.generateUuid();
            uuids.push(uuid);
        }

        // Assert
        expect(uuids).toHaveLength(100);
        expect(new Set(uuids)).toHaveLength(100);
    });

});
