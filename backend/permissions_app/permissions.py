from rest_framework.permissions import BasePermission


class HasFunctionPermission(BasePermission):
    """
    Checks whether the logged-in user has the
    required function/permission.
    """

    message = "You do not have permission to perform this action."

    def has_permission(self, request, view):

        # Get the permission required by the API view
        required_function = getattr(
            view,
            "required_function",
            None
        )

        # If the view does not specify a permission,
        # deny access
        if not required_function:
            return False

        # User must be logged in
        if not request.user or not request.user.is_authenticated:
            return False

        # Check whether this user has the required permission
        return request.user.functions.filter(
            code=required_function.upper()
        ).exists()