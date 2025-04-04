import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act  

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
// Public resources accessible to everyone (anonymous), regardless of login status.
p, anonymous, home, (list)|(show)
p, anonymous, blogs, (list)|(show)
p, anonymous, flightschool, (list)|(show)
p, anonymous, club, (list)|(show)
p, anonymous, fleet, (list)|(show)

// Also include policies for logged-in roles.
p, admin, home, (list)|(show)
p, member, home, (list)|(show)

p, admin, blogs, (list)|(show)
p, member, blogs, (list)|(show)

p, admin, flightschool, (list)|(show)
p, member, flightschool, (list)|(show)

p, admin, club, (list)|(show)
p, member, club, (list)|(show)

p, admin, fleet, (list)|(show)
p, member, fleet, (list)|(show)




// Additional policies for application resources
p, admin, members_dropdown, (list)|(show)
p, member, members_dropdown, (list)|(show)

p, admin, dashboard, (list)|(create)
p, admin, blogs/*, (edit)|(show)|(delete)
p, member, dashboard, (list)|(create)
p, member, blogs/*, (edit)|(show)|(delete)

p, admin, notices, (list)|(create)
p, admin, notices/*, (edit)|(show)|(delete)
p, member, notices, (list)|(create)
p, member, notices/*, (edit)|(show)

p, admin, flightplans_dropdown, (list)|(show)
p, member, flightplans_dropdown, (list)|(show)

p, admin, flightplans, (list)|(create)
p, admin, flightplans/*, (edit)|(show)|(delete)
p, member, flightplans, (list)|(create)
p, member, flightplans/*,(edit)|(show)|(delete)

p, admin, flightplans_int, (list)|(create)
p, admin, flightplans_int/*, (edit)|(show)|(delete)
p, member, flightplans_int, (list)|(create)
p, member, flightplans_int/*,(edit)|(show)|(delete)

p, admin, resources, (list)|(create)
p, admin, resources/*, (edit)|(show)|(delete)
p, member, resources, (list)|(show)

p, admin, profiles, (list)|(create)
p, admin, profiles/*, (show)|(delete)|(edit)
p, member, profiles, (list)
p, member, profiles/*, (edit)

p, admin, bookings, (list)|(create)
p, admin, bookings/*, (edit)|(show)|(delete)
p, member, bookings, (list)|(create)
p, member, bookings/*, (edit)|(show)|(delete)

p, admin, logbook, (list)|(create)
p, admin, logbook/*, (edit)|(show)|(delete)
p, member, logbook, (list)|(create)
p, member, logbook/*, (edit)|(show)|(delete)

p, admin, stats, (list)|(show)


p, admin, handbooks, (list)|(create)
p, admin, handbooks/*, (edit)|(show)|(delete)


p, admin, instructions, (list)|(create)
p, admin, instructions/*, (edit)|(show)|(delete)

p, admin, profiles_list, (list)|(create)
p, admin, profiles_list/*, (edit)|(show)|(delete)
p, member, profiles_list, (list)
p, member, profiles_list/*, (show)

p, admin, flightschool_members, (list)

p, admin, instructors, (list)|(create)
p, admin, instructors/*, (edit)|(show)|(delete)
p, member, instructors, (list)
p, member, instructors/*, (show)

p, admin, students, (list)|(create)
p, admin, students/*, (edit)|(show)|(delete)
p, member, students, (list)
p, member, students/*, (show)
`);


