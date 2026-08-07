using FluentValidation;
using Registerkini.DTOs;

namespace Registerkini.Validators
{
    public class GetInTouchDtoValidator : AbstractValidator<GetInTouchDto>
    {
        public GetInTouchDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.MobileNumber)
                .NotEmpty()
                .Matches(@"^[6-9]\d{9}$");

            RuleFor(x => x.Subject)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Message)
                .NotEmpty()
                .MaximumLength(1000);
        }
    }
}