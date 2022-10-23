from django import forms
from user.models import User, SaleManager, Agent, Lead

class UserAdminForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs) -> None:
        super(UserAdminForm, self).__init__(*args, **kwargs)
        print("self.fields", self.fields)
        if 'related_users' in self.initial:
            
            self.fields['related_users'].queryset = User.objects.filter(groups__name='lead')

class ManagerAdminForm(forms.ModelForm):
    class Meta:
        model = SaleManager
        fields = '__all__'

    def __init__(self, *args, **kwargs) -> None:
        super(ManagerAdminForm, self).__init__(*args, **kwargs)
        print("self.fields", self.fields)
        if 'related_users' in self.initial:
            
            self.fields['related_users'].queryset = User.objects.filter(groups__name__in=['lead','agent'])

class AgentAdminForm(forms.ModelForm):
    class Meta:
        model = Agent
        fields = '__all__'

    def __init__(self, *args, **kwargs) -> None:
        super(AgentAdminForm, self).__init__(*args, **kwargs)
        print("self.fields", self.fields)
        if 'related_users' in self.initial:
            
            self.fields['related_users'].queryset = User.objects.filter(groups__name='lead')

class LeadAdminForm(forms.ModelForm):
    class Meta:
        model = Lead
        fields = '__all__'

    def __init__(self, *args, **kwargs) -> None:
        super(LeadAdminForm, self).__init__(*args, **kwargs)
        print("self.fields", self.fields)
        if 'related_users' in self.initial:
            
            self.fields['related_users'].queryset = User.objects.filter(groups__name='lead')

