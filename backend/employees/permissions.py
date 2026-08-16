from permissions_app.permissions import HasFunctionPermission


class CanCreateEmployee(HasFunctionPermission):
    required_function = "CREATE_EMPLOYEE"


class CanEditEmployee(HasFunctionPermission):
    required_function = "EDIT_EMPLOYEE"


class CanDeleteEmployee(HasFunctionPermission):
    required_function = "DELETE_EMPLOYEE"


class CanViewEmployee(HasFunctionPermission):
    required_function = "VIEW_EMPLOYEE"


class CanViewSelf(HasFunctionPermission):
    required_function = "VIEW_SELF"