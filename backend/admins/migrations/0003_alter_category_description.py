# Generated by Django 4.1.1 on 2022-09-23 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admins', '0002_alter_category_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(),
        ),
    ]