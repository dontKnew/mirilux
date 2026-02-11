import DB from "./Database"; 

export default async function Example() {
  DB.debug = false;

  // DB.table("users")
  // .whereAnyLike(
  //   ["full_name", "email", "phone_no"],
  //   search
  // )
  // .orderBy("id", "DESC")
  // .paginate(page, perPage);

  // DB.table("users")
  // .whereLike("email", search)
  // .paginate(page, perPage);

  /* ===============================
     OUTPUT
  ================================ */
  console.log({
    users,
    user,
    activeUsers,
    usersWithProfiles,
    latestUsers,
    newUserId,
    paginated,
    rawUsers,
  });
}
