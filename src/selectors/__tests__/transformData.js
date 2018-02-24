import transformData from '../transformData';

describe('transformData selector', () => {
  it('transformData returns plain data when no transformers are passed', () => {
    expect(transformData(state => state, [])({
      foo: 'bar',
    })).toEqual({
      foo: 'bar',
    });
  });

  it('transformData returns data transformed with simple transformer', () => {
    expect(transformData(state => state, [
      item => ({ ...item, extraNewKey: item.foo }),
    ])({
      foo: 'bar',
    })).toEqual({
      foo: 'bar',
      extraNewKey: 'bar',
    });
  });

  it('transformData returns data transformed with selector transformer', () => {
    expect(transformData(state => state.participants.active.data, [
      {
        transform: (item, teams) => ({
          ...item,
          team: teams.find(team => team.id === item.teamId),
        }),
        select: state => state.teams.list.data,
      },
    ])({
      participants: {
        active: {
          data: {
            name: 'Foo',
            teamId: 10,
          },
        },
      },
      teams: {
        list: {
          data: [
            {
              id: 9,
              name: 'VIP',
            },
            {
              id: 10,
              name: 'Poločas nápadu',
            },
          ],
        },
      },
    })).toEqual({
      name: 'Foo',
      teamId: 10,
      team: {
        id: 10,
        name: 'Poločas nápadu',
      },
    });
  });

  it('transformData returns data transformed with chain of transformers', () => {
    expect(transformData(state => state.participants.active.data, [
      {
        transform: (item, teams) => ({
          ...item,
          team: teams.find(team => team.id === item.teamId),
        }),
        select: state => state.teams.list.data,
      },
      item => ({
        ...item,
        nameFull: `${item.nameFirst} ${item.nameLast}`,
      }),
      {
        transform: (item, roles) => ({
          ...item,
          roles: roles.filter(role => item.roleIds.indexOf(role.id) !== -1),
        }),
        select: state => state.roles.list.data,
      },
      {
        transform: item => ({
          ...item,
          mark: 'foo',
        }),
      },
    ])({
      participants: {
        active: {
          data: {
            nameFirst: 'Jana',
            nameLast: 'Smith',
            teamId: 10,
            roleIds: [3, 5],
          },
        },
      },
      roles: {
        list: {
          data: [
            {
              id: 2,
              name: 'Fridge',
            },
            {
              id: 3,
              name: 'Leader',
            },
            {
              id: 5,
              name: 'Owner',
            },
            {
              id: 7,
              name: 'Manager',
            },
          ],
        },
      },
      teams: {
        list: {
          data: [
            {
              id: 9,
              name: 'VIP',
            },
            {
              id: 10,
              name: 'Poločas nápadu',
            },
          ],
        },
      },
    })).toEqual({
      mark: 'foo',
      nameFirst: 'Jana',
      nameLast: 'Smith',
      nameFull: 'Jana Smith',
      teamId: 10,
      roleIds: [3, 5],
      team: {
        id: 10,
        name: 'Poločas nápadu',
      },
      roles: [
        {
          id: 3,
          name: 'Leader',
        },
        {
          id: 5,
          name: 'Owner',
        },
      ],
    });
  });
});
