import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import fetchReducer, { initialState } from "@/reducer/reducerFetching";
import React, { useEffect, useReducer, useState } from "react";
import useFetchEmployees from "./api/fetchEmployees";
import { GridLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { handleChangeInput } from "@/lib/handleChangeInput";
import useGetAllRoles from "./api/fetchRoles";
import { deleteUser } from "./api/deleteUser";
import { updateUser } from "./api/updateUser";
import { UserData } from "./static/TableHeadersData";
import NewEmployeesForm from "../addNewEmployees/NewEmployeesForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SearchIcon } from "lucide-react";

export type TEditedUserForm = {
  id: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  street: string;
  postalCode: string;
  email: string;
  state: string;
  city: string;
  country: string;
  roles: string[];
  [key: string]: string | null | string[];
}

export type TNewUserForm = {
  userName: string;
  email: string;
  password: string;
  roleName: string;
}

export default function EmployeesManagment() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const token = localStorage.getItem('token');
  const [roles, setRoles] = useState<string[]>([]);
  const [toggleAddUser, setToggleAddUser] = useState<boolean>(false);

  const fetchEmployees = useFetchEmployees(dispatch);
  const getRoles = useGetAllRoles()

  const [isEditableByUserId, setIsEditableByUserId] = useState<string | null>("");
  const [editedUserData, setEditedUserData] = useState<TEditedUserForm>({
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    email: "",
    roles: [],
  });

  const [newUserForm, setNewUserForm] = useState<TNewUserForm>({
    userName: "",
    email: "",
    password: "",
    roleName: "User",
  });

  useEffect(() => {
    const setRolesFromApi = async () => {
      setRoles(await getRoles())
    }
    setEditedUserData({
      ...editedUserData,
      id: isEditableByUserId
    })
    fetchEmployees();
    setRolesFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEmployees, getRoles, isEditableByUserId]);

  return (
    <>
      {state.isLoading && <div className="flex justify-center w-full">
        <GridLoader />
      </div>}
      {state.error && <p className="flex justify-center w-full">Error fetching data</p>}
      {!state.isLoading && !state.error && (
        <div className="w-full flex justify-center flex-col">
          <div className="w-full flex justify-end my-5 gap-5 px-5">
            {!toggleAddUser && (
              <Button variant="outline" className="w-fit " onClick={() => setToggleAddUser(prev => !prev)}>Dodaj użytkownika</Button>
            )}
            <form className="relative w-64">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950 mr-5"
                placeholder="Search users..."
                type="search"
              />
            </form>
          </div>
          {toggleAddUser ? (<> <NewEmployeesForm setToggleAddUser={setToggleAddUser} setNewUserForm={setNewUserForm} newUserForm={newUserForm} roles={roles} token={token} fetchEmployees={fetchEmployees} />
          </>
          ) : (null)}
          <ScrollArea className="border rounded-md mx-5">
            <Table>
              <TableHeader>
                <TableRow >
                  {UserData.map(headers =>
                    <TableHead className="bg-muted" key={headers.key}>{headers.label}</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.data?.map((user: TEditedUserForm) => (
                  <TableRow key={user.id}>
                    {isEditableByUserId === user.id ? (
                      <>
                        {
                          UserData.map(userForm => (
                            <TableCell key={userForm.label}>
                              {userForm.key === 'roles' ? (
                                <select
                                  multiple
                                  value={editedUserData.roles}
                                  onChange={(e) => {
                                    const selectedRoles = Array.from(
                                      e.target.selectedOptions,
                                      (option) => option.value
                                    );

                                    setEditedUserData({
                                      ...editedUserData,
                                      id: user.id,
                                      roles: selectedRoles,
                                    });
                                  }}
                                >
                                  {roles.map((role: undefined | any) => (
                                    <option key={role?.name} value={role?.name}>
                                      {role?.name}
                                    </option>
                                  ))}
                                </select>
                              ) : userForm.key === "akcje" ? (<TableCell className="flex">
                                {isEditableByUserId && (
                                  <Button size="sm" variant="outline" onClick={() => setIsEditableByUserId("")}>
                                    Anuluj
                                  </Button>
                                )}
                                <Button size="sm" variant="outline" onClick={() => updateUser(fetchEmployees, editedUserData, setEditedUserData, isEditableByUserId)}>
                                  Zapisz
                                </Button>
                              </TableCell>) : (
                                <Input
                                  className="m-0"
                                  placeholder={user[userForm.key] as string}
                                  onChange={(e) => handleChangeInput(setEditedUserData, e, userForm)}
                                  disabled={["userName", "email"].includes(userForm.key) && isEditableByUserId !== null}
                                />
                              )}
                            </TableCell>
                          ))
                        }
                      </>
                    ) : (
                      <>
                        <TableCell >{user.firstName}</TableCell>
                        <TableCell >{user.lastName}</TableCell>
                        <TableCell >{user.userName}</TableCell>
                        <TableCell >{user.street}</TableCell>
                        <TableCell >{user.postalCode}</TableCell>
                        <TableCell >{user.city}</TableCell>
                        <TableCell >{user.state}</TableCell>
                        <TableCell >{user.country}</TableCell>
                        <TableCell >{user.email}</TableCell>
                        <TableCell >{user.roles}</TableCell>
                        <TableCell className="flex">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditableByUserId(user.id)}
                          >
                            Edytuj
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteUser(user.id, fetchEmployees)}>
                            Usuń
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>


        </div >
      )
      }
    </>
  );
}
