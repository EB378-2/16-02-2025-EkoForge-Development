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
p, anonymous, flight school, (list)|(show)
p, anonymous, aviation club, (list)|(show)
p, anonymous, resources, (list)|(show)

// Also include policies for logged-in roles.
p, admin, home, (list)|(show)
p, member, home, (list)|(show)

p, admin, flight school, (list)|(show)
p, member, flight school, (list)|(show)

p, admin, aviation club, (list)|(show)
p, member, aviation club, (list)|(show)

p, admin, resources, (list)|(show)
p, member, resources, (list)|(show)

// Additional policies for application resources
p, admin, members_dropdown, (list)
p, member, members_dropdown, (list)

p, admin, dashboard, (list)|(create)
p, admin, dashboard/*, (edit)|(show)|(delete)
p, member, dashboard, (list)|(create)
p, member, dashboard/*, (edit)|(show)

p, admin, saftey_notice, (list)|(create)
p, admin, saftey_notice/*, (edit)|(show)|(delete)
p, member, saftey_notice, (list)|(create)
p, member, saftey_notice/*, (edit)|(show)

p, admin, flight_planning_members, (list)|(create)
p, admin, flight_planning_members/*, (edit)|(show)|(delete)
p, member, flight_planning_members, (list)
p, member, flight_planning_members/*, (show)

p, admin, flight_planning_local, (list)|(create)
p, admin, flight_planning_local/*, (edit)|(show)|(delete)
p, member, flight_planning_local, (list)
p, member, flight_planning_local/*, (show)

p, admin, international_flight_planning, (list)|(create)
p, admin, international_flight_planning/*, (edit)|(show)|(delete)
p, member, international_flight_planning, (list)
p, member, international_flight_planning/*, (show)

p, admin, members_profile_user, (list)|(create)|(edit)
p, admin, members_profile_user/*, (show)|(delete)
p, member, members_profile_user, (list)
p, member, members_profile_user/*, (show)

p, admin, bookings, (list)|(create)
p, admin, bookings/*, (edit)|(show)|(delete)
p, member, bookings, (list)|(create)
p, member, bookings/*, (edit)|(show)

p, admin, logbook, (list)|(create)
p, admin, logbook/*, (edit)|(show)|(delete)
p, member, logbook, (list)|(create)
p, member, logbook/*, (edit)|(show)

p, admin, statistics, (list)|(show)
p, member, statistics, (list)|(show)

p, admin, handbooks, (list)|(create)
p, admin, handbooks/*, (edit)|(show)|(delete)
p, member, handbooks, (list)
p, member, handbooks/*, (show)

p, admin, instructions, (list)|(create)
p, admin, instructions/*, (edit)|(show)|(delete)
p, member, instructions, (list)
p, member, instructions/*, (show)

p, admin, members_list, (list)|(create)
p, admin, members_list/*, (edit)|(show)|(delete)
p, member, members_list, (list)
p, member, members_list/*, (show)

p, admin, flight_school, (list)|(create)
p, admin, flight_school/*, (edit)|(show)|(delete)
p, member, flight_school, (list)
p, member, flight_school/*, (show)

p, admin, instructors, (list)|(create)
p, admin, instructors/*, (edit)|(show)|(delete)
p, member, instructors, (list)
p, member, instructors/*, (show)

p, admin, students, (list)|(create)
p, admin, students/*, (edit)|(show)|(delete)
p, member, students, (list)
p, member, students/*, (show)
`);